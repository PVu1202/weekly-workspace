// ═══════════════════════════════════════════════════════════════
// SIDEBAR — Toggle + Responsive
// ═══════════════════════════════════════════════════════════════

function toggleSidebar() {
  var sidebar = document.getElementById('appSidebar');
  var backdrop = document.getElementById('sidebarBackdrop');
  var toggleIcon = document.getElementById('sidebarToggleIcon');
  if (!sidebar) return;

  var isMobile = window.innerWidth < 1024;

  if (isMobile) {
    var isOpen = sidebar.classList.contains('mobile-open');
    if (isOpen) {
      sidebar.classList.remove('mobile-open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      sidebar.classList.add('mobile-open');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  } else {
    if (sidebar.dataset.animating === '1') return;
    sidebar.dataset.animating = '1';

    var willCollapse = !sidebar.classList.contains('collapsed');
    sidebar.classList.toggle('collapsed');

    if (toggleIcon) {
      toggleIcon.style.transform = willCollapse ? 'rotate(90deg)' : 'rotate(0deg)';
      toggleIcon.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }

    try {
      localStorage.setItem('sidebar_collapsed', willCollapse ? '1' : '0');
    } catch (e) {}

    setTimeout(function() {
      sidebar.dataset.animating = '0';
    }, 460);
  }
}

// Khôi phục trạng thái desktop khi load
(function restoreSidebarState() {
  if (window.innerWidth >= 1024) {
    try {
      if (localStorage.getItem('sidebar_collapsed') === '1') {
        var sb = document.getElementById('appSidebar');
        if (sb) {
          sb.style.transition = 'none';
          sb.classList.add('collapsed');
          void sb.offsetWidth;
          requestAnimationFrame(function() {
            sb.style.transition = '';
          });
        }
        var ic = document.getElementById('sidebarToggleIcon');
        if (ic) ic.style.transform = 'rotate(90deg)';
      }
    } catch (e) {}
  }
})();

// Tự động đóng drawer khi resize sang desktop
window.addEventListener('resize', function() {
  if (window.innerWidth >= 1024) {
    var sb = document.getElementById('appSidebar');
    var bd = document.getElementById('sidebarBackdrop');
    if (sb) sb.classList.remove('mobile-open');
    if (bd) bd.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Đóng drawer khi bấm vào menu item (chỉ mobile)
document.addEventListener('click', function(e) {
  if (window.innerWidth >= 1024) return;
  if (e.target.closest('#appSidebar nav button')) {
    setTimeout(function() {
      var sb = document.getElementById('appSidebar');
      var bd = document.getElementById('sidebarBackdrop');
      if (sb) sb.classList.remove('mobile-open');
      if (bd) bd.classList.remove('active');
      document.body.style.overflow = '';
    }, 200);
  }
});

console.log('✅ ui/sidebar.js loaded');