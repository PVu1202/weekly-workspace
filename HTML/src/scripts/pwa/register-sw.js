// ═══════════════════════════════════════════════════════════════
// PWA: REGISTER SW — Đăng ký Service Worker + Install prompt
// ═══════════════════════════════════════════════════════════════

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('✅ Service Worker đã đăng ký:', registration.scope);

        registration.addEventListener('updatefound', function() {
          var newWorker = registration.installing;
          newWorker.addEventListener('statechange', function() {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🔄 Có bản cập nhật mới!');
              if (typeof showTaskToast === 'function') {
                showTaskToast('🔄 Cập nhật mới', 'Tải lại trang để nhận bản mới nhất');
              }
            }
          });
        });
      })
      .catch(function(err) {
        console.warn('⚠️ Service Worker lỗi:', err);
      });

    window.addEventListener('beforeinstallprompt', function(e) {
      e.preventDefault();
      window.__deferredPrompt = e;
      console.log('📱 Có thể cài PWA');
      showInstallButton();
    });

    window.addEventListener('appinstalled', function() {
      console.log('✅ PWA đã được cài');
      window.__deferredPrompt = null;
    });
  });
}

// Nút cài PWA
function showInstallButton() {
  if (document.getElementById('pwaInstallBtn')) return;

  var sidebar = document.getElementById('appSidebar');
  if (!sidebar) return;

  var btn = document.createElement('button');
  btn.id = 'pwaInstallBtn';
  btn.className = 'w-full mt-2 px-3 py-2 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 hover:from-emerald-600/30 hover:to-cyan-600/30 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-300 transition flex items-center justify-center gap-2';
  btn.innerHTML = '<i class="fa-solid fa-download"></i> <span>Cài đặt App</span>';
  btn.onclick = function() {
    if (window.__deferredPrompt) {
      window.__deferredPrompt.prompt();
      window.__deferredPrompt.userChoice.then(function(choice) {
        console.log('User choice:', choice.outcome);
        window.__deferredPrompt = null;
        btn.remove();
      });
    }
  };

  var target = sidebar.querySelector('.p-3.border-t');
  if (target) target.appendChild(btn);
}

// Expose installPWA
window.ww = window.ww || {};
window.ww.installPWA = function() {
  if (window.__deferredPrompt) {
    window.__deferredPrompt.prompt();
  } else {
    if (window.Swal) {
      Swal.fire({
        icon: 'info',
        title: 'Cài đặt PWA',
        html: '<div class="text-xs text-left text-gray-300">' +
              '<b>Cách cài trên Chrome/Edge:</b><br>' +
              '1. Nhấn vào biểu tượng <b>Cài đặt</b> trên thanh địa chỉ<br>' +
              '2. Hoặc menu ⋮ → <b>Cài đặt Weekly Workspace</b><br><br>' +
              '<b>Trên iOS Safari:</b><br>' +
              '1. Nhấn <b>Share</b> 📤<br>' +
              '2. Chọn <b>"Thêm vào màn hình chính"</b>' +
              '</div>',
        background: '#1a1b2e',
        color: '#fff'
      });
    }
  }
};

console.log('✅ pwa/register-sw.js loaded');