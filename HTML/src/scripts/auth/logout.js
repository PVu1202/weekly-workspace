// ═══════════════════════════════════════════════════════════════
// AUTH: LOGOUT — Đăng xuất
// ═══════════════════════════════════════════════════════════════

function handleLogout() {
  Swal.fire({
    title: 'Đăng xuất?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#7c5dfa',
    cancelButtonColor: '#374151',
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy',
    background: '#1a1b2e',
    color: '#fff'
  }).then(function(res) {
    if (res.isConfirmed) {
      if (firebase.unsub) firebase.unsub();
      firebase.user = null;
      if (firebase.auth && firebase.signOut) {
        firebase.signOut(firebase.auth).catch(function(e) { console.warn(e); });
      }
    }
  });
}

console.log('✅ auth/logout.js loaded');