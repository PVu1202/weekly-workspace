// ═══════════════════════════════════════════════════════════════
// BACKGROUND PICKER — Đổi nền cho trang
// ═══════════════════════════════════════════════════════════════

var BACKGROUNDS = [
  {
    id: 'bg-default',
    label: 'Aurora mặc định',
    preview: 'linear-gradient(135deg, #08080c 0%, #1a0b30 50%, #0a1420 100%)'
  },
  {
    id: 'bg-ocean',
    label: 'Đại dương',
    preview: 'linear-gradient(135deg, #051428 0%, #0a3860 50%, #062840 100%)'
  },
  {
    id: 'bg-sunset',
    label: 'Hoàng hôn',
    preview: 'linear-gradient(135deg, #1a0a1f 0%, #7a1a3a 50%, #d97706 100%)'
  },
  {
    id: 'bg-forest',
    label: 'Rừng xanh',
    preview: 'linear-gradient(135deg, #071a0f 0%, #0d4d2a 50%, #14b8a6 100%)'
  },
  {
    id: 'bg-midnight',
    label: 'Nửa đêm',
    preview: 'linear-gradient(135deg, #0d0520 0%, #3b0764 50%, #6d28d9 100%)'
  },
  {
    id: 'bg-aurora',
    label: 'Cực quang',
    preview: 'linear-gradient(135deg, #030a14 0%, #34d399 35%, #8b5cf6 65%, #22d3ee 100%)'
  },
  {
    id: 'bg-cyberpunk',
    label: 'Cyberpunk',
    preview: 'linear-gradient(135deg, #0a0014 0%, #ec4899 50%, #22d3ee 100%)'
  },
  {
    id: 'bg-minimal',
    label: 'Đen thuần',
    preview: 'linear-gradient(135deg, #000 0%, #0a0a0a 100%)'
  }
];

// Apply background lên body
function applyBackground(bgId) {
  // Xóa tất cả class bg-* cũ
  var allBgIds = BACKGROUNDS.map(function(b) { return b.id; });
  allBgIds.forEach(function(id) {
    document.body.classList.remove(id);
  });

  // Thêm class mới
  if (bgId && allBgIds.indexOf(bgId) >= 0) {
    document.body.classList.add(bgId);
  } else {
    document.body.classList.add('bg-default');
    bgId = 'bg-default';
  }

  // Lưu vào state + localStorage
  if (!state.preferences) state.preferences = {};
  state.preferences.background = bgId;
  localStorage.setItem('ws_background', bgId);

  // Sync lên Firestore
  if (typeof saveStateToFirestore === 'function') {
    saveStateToFirestore();
  }

  return bgId;
}

// Lấy background hiện tại
function getCurrentBackground() {
  return (state.preferences && state.preferences.background) 
    || localStorage.getItem('ws_background') 
    || 'bg-default';
}

// Mở modal chọn background
function openBackgroundPicker() {
  var currentBg = getCurrentBackground();

  var itemsHtml = BACKGROUNDS.map(function(bg) {
    var isActive = bg.id === currentBg;
    return '<button type="button" ' +
              'class="bg-picker-item' + (isActive ? ' active' : '') + '" ' +
              'data-bg-id="' + bg.id + '" ' +
              'onclick="ww.pickBackground(\'' + bg.id + '\')">' +
              '<div class="bg-picker-preview" style="background:' + bg.preview + '"></div>' +
              '<div class="bg-picker-label">' + bg.label + '</div>' +
            '</button>';
  }).join('');

  Swal.fire({
    title: '',
    html:
      '<div style="text-align:left">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">' +
          '<div style="width:36px;height:36px;border-radius:10px;' +
              'background:linear-gradient(135deg,#7c5dfa,#22d3ee);' +
              'display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px">' +
            '<i class="fa-solid fa-image"></i>' +
          '</div>' +
          '<div>' +
            '<div style="font-size:16px;font-weight:800;color:#fff;letter-spacing:-0.02em">Đổi nền trang</div>' +
            '<div style="font-size:10px;color:#7d7d8a;margin-top:1px">Chọn nền ưa thích của bạn</div>' +
          '</div>' +
        '</div>' +
        '<div class="bg-picker-grid">' + itemsHtml + '</div>' +
        '<div style="margin-top:14px;padding:10px;border-radius:10px;' +
            'background:rgba(124,93,250,0.08);border:1px solid rgba(124,93,250,0.15);' +
            'font-size:10px;color:#a78bfa;text-align:center;line-height:1.5">' +
          '💡 Nền sẽ tự động lưu và áp dụng cho lần sau' +
        '</div>' +
      '</div>',
    showConfirmButton: false,
    showCloseButton: true,
    background: '#1a1b2e',
    color: '#fff',
    width: 460,
    allowOutsideClick: true,
    allowEscapeKey: true
  });
}

// User chọn background
function pickBackground(bgId) {
  applyBackground(bgId);

  // Update UI ngay (không cần đóng modal)
  var allItems = document.querySelectorAll('.bg-picker-item');
  allItems.forEach(function(el) {
    if (el.getAttribute('data-bg-id') === bgId) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Toast xác nhận
  var bg = BACKGROUNDS.find(function(b) { return b.id === bgId; });
  if (typeof showTaskToast === 'function' && bg) {
    showTaskToast('🎨 Đã đổi nền', bg.label);
  }
}

// Init — Load background khi khởi động
function initBackground() {
  // Ưu tiên: state.preferences → localStorage → default
  var savedBg = (state.preferences && state.preferences.background)
    || localStorage.getItem('ws_background')
    || 'bg-default';

  applyBackground(savedBg);
  console.log('🎨 Background loaded:', savedBg);
}

// Expose
window.ww = window.ww || {};
window.ww.openBackgroundPicker = openBackgroundPicker;
window.ww.pickBackground = pickBackground;
window.ww.applyBackground = applyBackground;
window.ww.getCurrentBackground = getCurrentBackground;
window.ww.initBackground = initBackground;

console.log('✅ ui/background-picker.js loaded');