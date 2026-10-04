// ═══════════════════════════════════════════════════════════════
// USER MENU — Dropdown menu + Mini level display
// ═══════════════════════════════════════════════════════════════

function toggleUserMenu(e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  var menu = document.getElementById('userMenu');
  if (!menu) return;

  if (menu.classList.contains('hidden')) {
    openUserMenu();
  } else {
    closeUserMenu();
  }
}

function openUserMenu() {
  var menu = document.getElementById('userMenu');
  if (!menu) return;

  // Cập nhật thông tin user
  var userName = document.getElementById('userName');
  var userEmail = document.getElementById('userEmail');
  var menuName = document.getElementById('menuUserName');
  var menuEmail = document.getElementById('menuUserEmail');

  if (userName && menuName) menuName.textContent = userName.textContent;
  if (userEmail && menuEmail) menuEmail.textContent = userEmail.textContent;

  menu.classList.remove('hidden');
}

function closeUserMenu() {
  var menu = document.getElementById('userMenu');
  if (menu) menu.classList.add('hidden');
}

// Update mini level display
function updateMiniLevel() {
  if (!state.gamification) return;

  var info = window.ww && window.ww.getXPProgressInLevel 
    ? window.ww.getXPProgressInLevel(state.gamification.totalXP || 0)
    : { level: 1, xpInLevel: 0, xpNeeded: 100, percent: 0 };

  var lvlEl = document.getElementById('miniLevelText');
  var xpEl = document.getElementById('miniXPText');
  var barEl = document.getElementById('miniXPBar');

  if (lvlEl) lvlEl.textContent = 'Lv ' + info.level;
  if (xpEl) xpEl.textContent = info.xpInLevel + '/' + info.xpNeeded + ' XP';
  if (barEl) barEl.style.width = info.percent + '%';
}


// Đóng menu khi click ra ngoài
document.addEventListener('click', function(e) {
  var menu = document.getElementById('userMenu');
  var card = document.getElementById('userCard');
  if (!menu || menu.classList.contains('hidden')) return;

  if (!menu.contains(e.target) && (!card || !card.contains(e.target))) {
    closeUserMenu();
  }
});

// Đóng menu khi ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeUserMenu();
});

// Placeholder cho "Thành tích của tôi"
function showStatsModal() {
  var g = state.gamification || { totalXP: 0 };
  var info = window.ww && window.ww.getXPProgressInLevel 
    ? window.ww.getXPProgressInLevel(g.totalXP || 0)
    : { level: 1, xpInLevel: 0, xpNeeded: 100, percent: 0 };

  var totalTasks = state.goals.length;
  var doneTasks = state.goals.filter(function(goal) {
    var subs = goal.subtasks || [];
    return subs.length > 0 && subs.every(function(s) { return s.completed; });
  }).length;

  Swal.fire({
    title: '🏆 Thành tích',
    html: '<div style="text-align:left">' +
            '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08)">' +
              '<span style="color:#9ca3af">Cấp độ</span>' +
              '<span style="color:#fbbf24;font-weight:800">Lv ' + info.level + '</span>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08)">' +
              '<span style="color:#9ca3af">Tổng XP</span>' +
              '<span style="color:#a78bfa;font-weight:700">' + (g.totalXP || 0) + '</span>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08)">' +
              '<span style="color:#9ca3af">Tổng task</span>' +
              '<span style="color:#fff;font-weight:700">' + totalTasks + '</span>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;padding:8px 0">' +
              '<span style="color:#9ca3af">Đã hoàn thành</span>' +
              '<span style="color:#10b981;font-weight:700">' + doneTasks + '</span>' +
            '</div>' +
          '</div>',
    confirmButtonText: 'Đóng',
    confirmButtonColor: '#7c5dfa',
    background: '#1a1b2e',
    color: '#fff',
    width: 380
  });
}

// Expose
window.ww = window.ww || {};
window.ww.toggleUserMenu = toggleUserMenu;
window.ww.openUserMenu = openUserMenu;
window.ww.closeUserMenu = closeUserMenu;
window.ww.updateMiniLevel = updateMiniLevel;
window.ww.showStatsModal = showStatsModal;

console.log('✅ ui/user-menu.js loaded');