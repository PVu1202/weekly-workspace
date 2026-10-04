// ═══════════════════════════════════════════════════════════════
// AUTH: LOGIN — Email/Password + Tab switching
// ═══════════════════════════════════════════════════════════════

function switchAuthTab(mode) {
  var loginBtn = document.getElementById('tabLoginBtn');
  var registerBtn = document.getElementById('tabRegisterBtn');
  var nameGroup = document.getElementById('displayNameGroup');
  var submitText = document.getElementById('authSubmitText');

  if (mode === 'login') {
    loginBtn.className = "flex-1 py-2 rounded-lg bg-gemini-accent text-white transition";
    registerBtn.className = "flex-1 py-2 rounded-lg text-gray-400 hover:text-white transition";
    nameGroup.classList.add('hidden');
    submitText.innerText = "Đăng Nhập Ngay";
    window.__authMode = 'login';
  } else {
    registerBtn.className = "flex-1 py-2 rounded-lg bg-gemini-accent text-white transition";
    loginBtn.className = "flex-1 py-2 rounded-lg text-gray-400 hover:text-white transition";
    nameGroup.classList.remove('hidden');
    submitText.innerText = "Đăng Ký Tài Khoản";
    window.__authMode = 'register';
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  if (!firebase.auth) {
    Swal.fire({ icon:'error', title:'Firebase chưa sẵn sàng', text:'Kiểm tra kết nối mạng.', background:'#1a1b2e', color:'#fff' });
    return;
  }

  var email = document.getElementById('authEmail').value.trim();
  var password = document.getElementById('authPassword').value;
  var displayName = document.getElementById('authDisplayName').value.trim();
  var spinner = document.getElementById('authSubmitSpinner');
  spinner.classList.remove('hidden');
  var mode = window.__authMode || 'login';

  var promise = mode === 'register'
    ? firebase.createUser(firebase.auth, email, password).then(function(cred) {
        if (firebase.updateProfile) return firebase.updateProfile(cred.user, { displayName: displayName });
      })
    : firebase.signInEmail(firebase.auth, email, password);

  promise.then(function() {
    Swal.fire({
      icon: 'success',
      title: mode === 'register' ? 'Đăng ký thành công!' : 'Đăng nhập thành công!',
      timer: 1200,
      showConfirmButton: false,
      background: '#1a1b2e',
      color: '#fff'
    });
  }).catch(function(error) {
    console.warn('Auth error:', error);
    var msg = "Đăng nhập thất bại.";
    var c = error.code || '';
    if (['auth/invalid-credential','auth/user-not-found','auth/wrong-password','auth/invalid-login-credentials'].indexOf(c) >= 0) {
      msg = "Email hoặc mật khẩu không chính xác.";
    } else if (c === 'auth/email-already-in-use') {
      msg = "Email đã được sử dụng.";
    } else if (c === 'auth/weak-password') {
      msg = "Mật khẩu quá yếu (tối thiểu 6 ký tự).";
    } else if (c === 'auth/operation-not-allowed') {
      msg = "Chưa bật Email/Password trong Firebase Auth. Vào Firebase Console → Authentication → Sign-in method → bật Email/Password.";
    } else if (c === 'auth/unauthorized-domain') {
      msg = "Tên miền chưa được cấp phép. Thêm localhost vào Authorized Domains.";
    } else if (c === 'auth/invalid-api-key') {
      msg = "API Key không hợp lệ. Kiểm tra firebaseConfig.";
    } else {
      msg = error.message || msg;
    }
    Swal.fire({ icon:'error', title:'Lỗi Xác Thực', html: msg, background:'#1a1b2e', color:'#fff' });
  }).then(function() {
    spinner.classList.add('hidden');
  });
}

console.log('✅ auth/login.js loaded');