// ═══════════════════════════════════════════════════════════════
// AUTH: SESSION — Show auth screen + Activate user session
// ═══════════════════════════════════════════════════════════════

function showAuthScreen() {
  var auth = document.getElementById('authScreen');
  var sidebar = document.getElementById('appSidebar');
  var main = document.getElementById('appMain');
  if (auth) auth.classList.remove('hidden');
  if (sidebar) sidebar.classList.add('hidden');
  if (main) main.classList.add('hidden');

   // ✅ Reset background flag khi logout
  if (typeof resetBackgroundInit === 'function') {
    resetBackgroundInit();
  }
}

function activateUserSession(user) {
  firebase.user = user;
  document.getElementById('authScreen').classList.add('hidden');
  document.getElementById('appSidebar').classList.remove('hidden');
  document.getElementById('appMain').classList.remove('hidden');

  var un = document.getElementById('userName');
  var ue = document.getElementById('userEmail');
  var ua = document.getElementById('userAvatar');

  if (un) {
    if (user.isAnonymous) un.innerText = 'Khách ẩn danh';
    else un.innerText = user.displayName || user.email || 'User';
  }
  if (ue) ue.innerText = user.email || '';
  if (ua) {
    if (user.photoURL) ua.src = user.photoURL;
    else {
      var ch = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
      ua.src = 'https://placehold.co/100x100/7c5dfa/fff?text=' + ch;
    }
  }

  // ✅ THÊM: Update mini level display
  setTimeout(function() {
    if (typeof updateMiniLevel === 'function') updateMiniLevel();
  }, 300);

    subscribeUserData(user.uid);
  
  // ✅ Re-init background sau khi user login
  setTimeout(function() {
    if (typeof resetBackgroundInit === 'function') resetBackgroundInit();
    if (typeof initBackground === 'function') initBackground();
  }, 500);
}

console.log('✅ auth/session.js loaded');