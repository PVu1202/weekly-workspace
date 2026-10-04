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
  soundEnabled = !soundEnabled;
  localStorage.setItem('ws_sound_enabled', soundEnabled ? 'true' : 'false');
  var icon = document.getElementById('soundIcon');
  if (icon) {
    icon.className = soundEnabled
      ? 'fa-solid fa-volume-high text-sm'
      : 'fa-solid fa-volume-xmark text-sm';
  }
  if (soundEnabled && typeof playSound === 'function') playSound('success');
  if (typeof showTaskToast === 'function') {
    showTaskToast(soundEnabled ? '🔊 Đã bật âm thanh' : '🔇 Đã tắt âm thanh', '');
  }
  console.log('🔊 Sound:', soundEnabled ? 'on' : 'off');
}

// Restore trạng thái âm thanh khi load
(function restoreSoundState() {
  var icon = document.getElementById('soundIcon');
  if (icon && !soundEnabled) {
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