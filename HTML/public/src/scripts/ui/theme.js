// ═══════════════════════════════════════════════════════════════
// THEME — Chỉ còn Sound Toggle (đã xóa Light/Dark theme)
// ═══════════════════════════════════════════════════════════════

function toggleSound() {
  window.soundEnabled = !window.soundEnabled;
  localStorage.setItem('ws_sound_enabled', window.soundEnabled ? 'true' : 'false');
  var icon = document.getElementById('soundIcon');
  if (icon) icon.className = window.soundEnabled 
    ? 'fa-solid fa-volume-high text-sm' 
    : 'fa-solid fa-volume-xmark text-sm';
  if (window.soundEnabled && typeof playSound === 'function') playSound('success');
  if (typeof showTaskToast === 'function') {
    showTaskToast(window.soundEnabled ? '🔊 Đã bật âm thanh' : '🔇 Đã tắt âm thanh', '');
  }
  console.log('🔊 Sound:', window.soundEnabled ? 'on' : 'off');
}

// Restore trạng thái âm thanh khi load
(function restoreSoundState() {
  var icon = document.getElementById('soundIcon');
  if (icon && !window.soundEnabled) {
    icon.className = 'fa-solid fa-volume-xmark text-sm';
  }
})();

// Stub function để không lỗi nếu có chỗ gọi
function toggleTheme() {
  console.warn('⚠️ Chức năng đổi theme đã bị xóa');
}

console.log('✅ ui/theme.js loaded');