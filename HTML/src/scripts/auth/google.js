// ═══════════════════════════════════════════════════════════════
// AUTH: GOOGLE — Đăng nhập bằng Google popup
// ═══════════════════════════════════════════════════════════════

function handleGoogleLogin() {
  if (!firebase.auth) {
    Swal.fire({ icon:'error', title:'Firebase chưa sẵn sàng', background:'#1a1b2e', color:'#fff' });
    return;
  }

  var spin = document.getElementById('spinGoogleBtn');
  var txt = document.getElementById('txtGoogleBtn');
  if (spin) spin.classList.remove('hidden');
  if (txt) txt.innerText = 'Đang kết nối...';

  var provider = new firebase.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  firebase.signInPopup(firebase.auth, provider).catch(function(err) {
    console.warn('Google Auth error:', err);

    if (err.code === 'auth/popup-blocked') {
      firebase.signInRedirect(firebase.auth, provider).catch(function(e) { console.error(e); });
    } else if (err.code === 'auth/unauthorized-domain') {
      Swal.fire({
        icon: 'error',
        title: 'Tên miền chưa cấp phép',
        html: 'Thêm <b>localhost</b> vào Firebase Console → Authentication → Settings → Authorized Domains.',
        background: '#1a1b2e',
        color: '#fff'
      });
    } else if (err.code !== 'auth/popup-closed-by-user') {
      Swal.fire({
        icon: 'warning',
        title: 'Lỗi Google',
        text: err.message || 'Kiểm tra Firebase config.',
        background: '#1a1b2e',
        color: '#fff'
      });
    }
  }).then(function() {
    if (spin) spin.classList.add('hidden');
    if (txt) txt.innerText = 'Đăng nhập với Google';
  });
}

console.log('✅ auth/google.js loaded');