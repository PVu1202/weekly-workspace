// ═══════════════════════════════════════════════════════════════
// AUTH: GUEST — Đăng nhập ẩn danh
// ═══════════════════════════════════════════════════════════════

function handleGuestLogin() {
  var spin = document.getElementById('spinGuestBtn');
  var txt = document.getElementById('txtGuestBtn');
  if (spin) spin.classList.add('hidden');
  if (txt) txt.innerText = 'Dùng thử với tư cách Khách';

  if (!firebase.auth || !firebase.signInAnonymously) {
    Swal.fire({
      icon: 'error',
      title: 'Firebase chưa sẵn sàng',
      text: 'Đợi 3 giây rồi thử lại.',
      background: '#1a1b2e',
      color: '#fff'
    });
    return;
  }

  // Ẩn authScreen tạm thời để dialog hiện rõ
  var authScreen = document.getElementById('authScreen');
  var wasHidden = authScreen && authScreen.classList.contains('hidden');

  if (authScreen && !wasHidden) {
    authScreen.classList.add('hidden');
  }

  Swal.fire({
    title: 'Chế độ Khách',
    html: '<div style="text-align:left;color:#c4b5fd;font-size:13px;line-height:1.6">' +
          'Bạn sẽ dùng app với tư cách <b style="color:#10b981">Khách ẩn danh</b>.<br><br>' +
          '<b style="color:#fff">Ưu điểm:</b><br>' +
          '• Dùng ngay, không cần đăng ký<br>' +
          '• Dữ liệu lưu trên cloud<br><br>' +
          '<b style="color:#f59e0b">Lưu ý:</b><br>' +
          '• Nếu xóa cache, có thể mất quyền truy cập<br>' +
          '• Nên tạo tài khoản chính thức sau' +
          '</div>',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '✅ Tiếp tục',
    cancelButtonText: '❌ Hủy',
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#6b7280',
    background: '#1a1b2e',
    color: '#fff',
    allowOutsideClick: false,
    allowEscapeKey: false,
    reverseButtons: true,
    focusConfirm: true
  }).then(function (result) {
    if (!result.isConfirmed) {
      if (authScreen && !wasHidden) authScreen.classList.remove('hidden');
      return;
    }

    if (spin) spin.classList.remove('hidden');
    if (txt) txt.innerText = 'Đang tạo phiên Khách...';

    var timeoutId = setTimeout(function () {
      if (spin) spin.classList.add('hidden');
      if (txt) txt.innerText = 'Dùng thử với tư cách Khách';
      if (authScreen && !wasHidden) authScreen.classList.remove('hidden');
      Swal.fire({
        icon: 'error',
        title: 'Không phản hồi',
        text: 'Firebase không phản hồi sau 15 giây.',
        background: '#1a1b2e',
        color: '#fff'
      });
    }, 15000);

    firebase.signInAnonymously(firebase.auth).then(function (cred) {
      clearTimeout(timeoutId);
      console.log('✅ Guest OK:', cred.user.uid);
    }).catch(function (err) {
      clearTimeout(timeoutId);
      console.error('❌ Guest err:', err);
      if (spin) spin.classList.add('hidden');
      if (txt) txt.innerText = 'Dùng thử với tư cách Khách';

      if (authScreen && !wasHidden) authScreen.classList.remove('hidden');

      var msg = err.message || 'Lỗi không xác định';
      if (err.code === 'auth/operation-not-allowed') {
        msg = 'Anonymous Auth chưa bật trong Firebase Console.';
      }
      Swal.fire({
        icon: 'error',
        title: 'Lỗi: ' + (err.code || 'unknown'),
        text: msg,
        background: '#1a1b2e',
        color: '#fff'
      });
    });
  });
}

console.log('✅ auth/guest.js loaded');