// ═══════════════════════════════════════════════════════════════
// AUTH: FIREBASE MODAL — Cấu hình Firebase
// ═══════════════════════════════════════════════════════════════

function openFirebaseConfigModal() {
  var saved = localStorage.getItem('gemini_custom_firebase_config');
  var ta = document.getElementById('firebaseConfigInput');
  if (ta) ta.value = saved || JSON.stringify(DEFAULT_FIREBASE_CONFIG, null, 2);
  document.getElementById('firebaseConfigModal').classList.remove('hidden');
}

function closeFirebaseConfigModal() {
  document.getElementById('firebaseConfigModal').classList.add('hidden');
}

function saveCustomFirebaseConfig() {
  var raw = document.getElementById('firebaseConfigInput').value.trim();
  try {
    var parsed = JSON.parse(raw);
    if (!parsed.apiKey || !parsed.authDomain || !parsed.projectId) {
      throw new Error("Cần có ít nhất: apiKey, authDomain, projectId.");
    }
    localStorage.setItem('gemini_custom_firebase_config', JSON.stringify(parsed));
    Swal.fire({
      icon: 'success',
      title: 'Đã lưu!',
      text: 'Ứng dụng sẽ tự tải lại.',
      background: '#1a1b2e',
      color: '#fff'
    }).then(function() { location.reload(); });
  } catch (e) {
    Swal.fire({
      icon: 'error',
      title: 'JSON Không Hợp Lệ',
      text: e.message,
      background: '#1a1b2e',
      color: '#fff'
    });
  }
}

function resetFirebaseConfig() {
  localStorage.removeItem('gemini_custom_firebase_config');
  Swal.fire({
    icon: 'info',
    title: 'Đã khôi phục mặc định',
    background: '#1a1b2e',
    color: '#fff'
  }).then(function() { location.reload(); });
}

console.log('✅ auth/firebase-modal.js loaded');