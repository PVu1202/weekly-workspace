// ═══════════════════════════════════════════════════════════════
// HELP SYSTEM — Hướng dẫn sử dụng
// ═══════════════════════════════════════════════════════════════

// ═══ NỘI DUNG HƯỚNG DẪN TỪNG PHẦN ═══
var HELP_CONTENT = {
  'chia-nho': {
    icon: 'fa-sitemap',
    color: 'violet',
    title: 'Chia Nhỏ Nhiệm Vụ',
    subtitle: 'Biến mục tiêu lớn thành các bước nhỏ dễ làm',
    illustration: '/assets/help/chia-nho.png',
    sections: [
      { title: '📌 Thêm mục tiêu', content: 'Nhập tên mục tiêu lớn (VD: "Làm website"), chọn số giờ dự kiến, thứ trong tuần, độ ưu tiên và deadline (nếu có). Bấm **Thêm** để tạo.' },
      { title: '✅ Tick hoàn thành', content: 'Mỗi mục tiêu có các **bước nhỏ** (subtask). Tick vào ô vuông để đánh dấu hoàn thành. Khi hoàn thành tất cả → **bắn confetti** 🎉' },
      { title: '✏️ Sửa/xóa', content: 'Hover vào task → hiện 3 nút: **Sửa** (đổi tên, giờ, ưu tiên), **Nhân bản** (copy task), **Xóa** (xóa task).' },
      { title: '➕ Thêm bước mới', content: 'Ở cuối mỗi task có ô **"+ Thêm bước mới"**. Gõ tên bước → Enter → tạo ngay.' },
      { title: '🎨 Đổi độ ưu tiên', content: 'Bấm nút **🔄** trên task để cycle: 🔴 Cao → 🟡 Trung → 🟢 Thấp → 🔴 Cao...' },
      { title: '📊 Tiến độ tuần', content: 'Board "Tiến độ từng tuần" hiển thị % hoàn thành của từng tuần. Click vào tuần để xem chi tiết, hover để thấy nút xóa 🗑️' }
    ]
  },
  'lich-tuan': {
    icon: 'fa-calendar-week',
    color: 'blue',
    title: 'Lịch Tuần 7 Ngày',
    subtitle: 'Xem tổng quan công việc cả tuần',
    illustration: '/assets/help/lich-tuan.png',
    sections: [
      { title: '📅 Cột theo thứ', content: '7 cột tương ứng 7 ngày. Mỗi cột hiển thị các task của ngày đó + % hoàn thành.' },
      { title: '🖱️ Click vào task', content: 'Click vào task trong lịch → **tự chuyển** sang tab "Chia Nhỏ" và chọn đúng ngày đó.' },
      { title: '🎨 Màu viền', content: '**Viền trái** của task thể hiện độ ưu tiên: 🔴 Cao, 🟡 Trung, 🟢 Thấp.' },
      { title: '✅ Đánh dấu Xong', content: 'Task có tất cả bước đã tick → hiện dấu ✓ và mờ đi, có gạch ngang tên.' }
    ]
  },
  'pomodoro': {
    icon: 'fa-stopwatch',
    color: 'cyan',
    title: 'Thời Gian & Pomodoro',
    subtitle: 'Quản lý thời gian làm việc theo kỹ thuật Pomodoro',
    illustration: '/assets/help/pomodoro.png',
    sections: [
      { title: '▶️ Bắt đầu', content: 'Bấm **Bắt Đầu** → đồng hồ đếm ngược từ **25:00**. Bấm **Tạm Dừng** để dừng tạm thời.' },
      { title: '🔄 Đặt lại', content: 'Bấm **Đặt Lại** để reset về 25:00 và dừng timer.' },
      { title: '⏰ Hết giờ', content: 'Sau 25 phút → thông báo "Hết giờ!" + nhận **+10 XP** (nếu đã bật gamification).' },
      { title: '📊 Bảng thời gian', content: 'Bên dưới có bảng so sánh **giờ dự kiến** vs **giờ thực tế** của mỗi task. Điền số giờ thực tế vào ô input để theo dõi.' }
    ]
  },
  'ai-coach': {
    icon: 'fa-robot',
    color: 'fuchsia',
    title: 'AI Coach',
    subtitle: 'Trợ lý AI giúp bạn tập trung và productive hơn',
    illustration: '/assets/help/ai-coach.png',
    sections: [
      { title: '🤖 Gợi ý AI', content: 'Bấm **"AI gợi ý cho tôi"** → AI phân tích task chưa xong và đề xuất nên làm gì trước.' },
      { title: '📅 Việc hôm nay', content: 'Danh sách task cần xử lý **hôm nay** và các ngày tới hạn. Task quá hạn có viền đỏ.' },
      { title: '🔔 Nhắc nhở', content: 'Bấm **"Bật nhắc nhở"** → cho phép app gửi thông báo nhắc bạn khi có task đến hạn.' }
    ]
  },
  'thong-ke': {
    icon: 'fa-chart-line',
    color: 'amber',
    title: 'Thống Kê',
    subtitle: 'Theo dõi tiến độ và thành tích của bạn',
    illustration: '/assets/help/thong-ke.png',
    sections: [
      { title: '📊 4 chỉ số chính', content: '**Tổng mục tiêu** • **Giờ đã làm** • **Tỷ lệ hoàn thành** • **Chuỗi ngày** (streak).' },
      { title: '📈 Biểu đồ tuần', content: 'Đường cong tiến độ **7 tuần gần nhất** — so sánh tuần này với các tuần trước.' },
      { title: '🥧 Phân bổ ưu tiên', content: 'Biểu đồ tròn thể hiện tỷ lệ task 🔴 Cao / 🟡 Trung / 🟢 Thấp.' },
      { title: '🏆 Thành tựu', content: 'Đạt các mốc để mở khóa **8 huy hiệu** — Khởi đầu, Chăm chỉ, Bền bỉ, Hoàn hảo...' }
    ]
  },
  'nhin-lai': {
    icon: 'fa-clipboard-check',
    color: 'emerald',
    title: 'Nhìn Lại Cuối Tuần',
    subtitle: 'Reflection — Đánh giá bản thân sau mỗi tuần',
    illustration: '/assets/help/nhin-lai.png',
    sections: [
      { title: '🏆 Top 3 thành tựu', content: 'Ghi lại **3 điều bạn làm tốt nhất** tuần này.' },
      { title: '⚠️ Khó khăn', content: 'Điều gì **cản trở** bạn? (VD: trì hoãn, thiếu thời gian...)' },
      { title: '💡 Bài học', content: 'Bạn **học được gì** từ tuần này để cải thiện tuần sau?' },
      { title: '⭐ Điểm tuần', content: 'Tự cho điểm từ **1-10** — nhìn lại bức tranh tổng thể.' },
      { title: '🎯 Mục tiêu tuần tới', content: 'Đặt **1 mục tiêu quan trọng nhất** cho tuần sau.' },
      { title: '📤 Xuất/Nhập', content: '**Xuất dữ liệu** → tải file JSON backup. **Nhập dữ liệu** → khôi phục từ file backup.' }
    ]
  },
  'sidebar': {
    icon: 'fa-compass',
    color: 'purple',
    title: 'Thanh Điều Hướng',
    subtitle: 'Các công cụ bên sidebar',
    illustration: '/assets/help/sidebar.png',
    sections: [
      { title: '🕐 Chọn Tuần', content: 'Nút **◀ ▶** chuyển tuần trước/sau. **Ô giữa** hiển thị tuần hiện tại. Bấm **"Về tuần hiện tại"** để quay về tuần này.' },
      { title: '🏆 Player Card', content: 'Hiển thị **Level** và **XP**. Càng làm nhiều task, càng nhận nhiều XP → lên level.' },
      { title: '📊 Tiến độ tuần', content: 'Thanh % hiển thị tổng tiến độ **tuần hiện tại**. Số trong ngoặc = tổng số bước nhỏ.' },
      { title: '👤 User Card', content: 'Ảnh + tên + email. Bấm **⋯** để mở menu: Đổi theme, âm thanh, thành tích, cấu hình, đăng xuất.' }
    ]
  }
};
// ═══ MỞ HELP MODAL ═══
function openHelpModal(sectionKey) {
  if (!sectionKey) {
    showHelpMenu();
    return;
  }

  var content = HELP_CONTENT[sectionKey];
  if (!content) {
    showHelpMenu();
    return;
  }

  var sectionsHtml = content.sections.map(function(sec) {
    var formattedContent = sec.content.replace(/\*\*(.+?)\*\*/g, '<b style="color:#fff">$1</b>');
    
    return '<div style="padding:10px 12px;border-radius:10px;background:rgba(255,255,255,0.03);' +
            'border:1px solid rgba(255,255,255,0.06);margin-bottom:8px">' +
            '<div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:4px">' + sec.title + '</div>' +
            '<div style="font-size:11px;color:#9ca3af;line-height:1.6">' + formattedContent + '</div>' +
          '</div>';
  }).join('');

  // ✅ Hiển thị ảnh minh họa nếu có
var illustrationHtml = content.illustration
  ? '<div style="margin:12px 0;text-align:center">' +
      '<div style="display:inline-block;position:relative;border-radius:12px;overflow:hidden;' +
                  'border:1px solid rgba(124,93,250,0.25);' +
                  'box-shadow:0 8px 30px rgba(0,0,0,0.4);cursor:zoom-in;' +
                  'transition:transform 0.2s ease" ' +
           'onclick="ww.zoomHelpImage(\'' + content.illustration + '\', \'' + content.title + '\')" ' +
           'onmouseover="this.style.transform=\'scale(1.02)\';this.style.borderColor=\'rgba(124,93,250,0.5)\'" ' +
           'onmouseout="this.style.transform=\'scale(1)\';this.style.borderColor=\'rgba(124,93,250,0.25)\'">' +
        '<img src="' + content.illustration + '" ' +
             'alt="' + content.title + '" ' +
             'style="display:block;width:100%;max-width:440px;max-height:200px;' +
                    'object-fit:cover;object-position:top center">' +
        '<div style="position:absolute;bottom:6px;right:6px;padding:3px 8px;' +
                    'background:rgba(19,19,29,0.9);border:1px solid rgba(124,93,250,0.3);' +
                    'border-radius:6px;font-size:9px;color:#a78bfa;font-weight:600;' +
                    'backdrop-filter:blur(8px)">' +
          '<i class="fa-solid fa-expand"></i> Click để xem lớn' +
        '</div>' +
      '</div>' +
    '</div>'
  : '';

  Swal.fire({
    title: '',
    html:
      '<div style="text-align:left">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">' +
          '<div style="width:36px;height:36px;border-radius:10px;' +
              'background:linear-gradient(135deg,rgba(124,93,250,0.2),rgba(34,211,238,0.1));' +
              'border:1px solid rgba(124,93,250,0.3);display:flex;align-items:center;justify-content:center;' +
              'color:#a78bfa;font-size:14px">' +
            '<i class="fa-solid ' + content.icon + '"></i>' +
          '</div>' +
          '<div>' +
            '<div style="font-size:16px;font-weight:800;color:#fff;letter-spacing:-0.02em">' + content.title + '</div>' +
            '<div style="font-size:10px;color:#7d7d8a;margin-top:1px">' + content.subtitle + '</div>' +
          '</div>' +
        '</div>' +
        illustrationHtml +
        '<div style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);margin:12px 0"></div>' +
        '<div style="max-height:300px;overflow-y:auto;padding-right:4px">' + sectionsHtml + '</div>' +
      '</div>',
    confirmButtonText: 'Đã hiểu',
    confirmButtonColor: '#7c5dfa',
    background: '#1a1b2e',
    color: '#fff',
    width: 520,
    showCloseButton: true,
    // ✅ Cho phép click ra ngoài để đóng
    allowOutsideClick: true,
    allowEscapeKey: true,
    // ✅ Cho phép click vào vùng backdrop đóng
    backdrop: true
  });
}
// ═══ MENU CHỌN PHẦN CẦN XEM ═══
function showHelpMenu() {
  var items = [
    { key: 'chia-nho', label: 'Chia Nhỏ Nhiệm Vụ', icon: 'fa-sitemap', color: '#a78bfa' },
    { key: 'lich-tuan', label: 'Lịch Tuần 7 Ngày', icon: 'fa-calendar-week', color: '#60a5fa' },
    { key: 'pomodoro', label: 'Pomodoro', icon: 'fa-stopwatch', color: '#22d3ee' },
    { key: 'ai-coach', label: 'AI Coach', icon: 'fa-robot', color: '#e879f9' },
    { key: 'thong-ke', label: 'Thống Kê', icon: 'fa-chart-line', color: '#fbbf24' },
    { key: 'nhin-lai', label: 'Nhìn Lại Cuối Tuần', icon: 'fa-clipboard-check', color: '#34d399' },
    { key: 'sidebar', label: 'Thanh Điều Hướng', icon: 'fa-compass', color: '#a78bfa' }
  ];

var itemsHtml = items.map(function(item) {
  return '<button onclick="ww.openHelpModal(\'' + item.key + '\')" ' +
            'style="display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;' +
            'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);' +
            'border-radius:10px;color:#fff;font-size:12px;font-weight:600;cursor:pointer;' +
            'text-align:left;font-family:inherit;transition:all 0.15s ease;margin-bottom:6px" ' +
            'onmouseover="this.style.background=\'rgba(124,93,250,0.1)\';this.style.borderColor=\'rgba(124,93,250,0.3)\'" ' +
            'onmouseout="this.style.background=\'rgba(255,255,255,0.03)\';this.style.borderColor=\'rgba(255,255,255,0.06)\'">' +
            
            // ✅ Thêm thumbnail nhỏ
            '<div style="width:32px;height:32px;border-radius:8px;background:rgba(0,0,0,0.3);' +
                'display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">' +
              '<img src="' + HELP_CONTENT[item.key].illustration + '" style="width:100%;height:100%;object-fit:cover">' +
            '</div>' +
            
            '<span style="flex:1">' + item.label + '</span>' +
            '<i class="fa-solid fa-chevron-right" style="color:#4b5563;font-size:9px"></i>' +
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
            '<i class="fa-solid fa-circle-question"></i>' +
          '</div>' +
          '<div>' +
            '<div style="font-size:16px;font-weight:800;color:#fff">Trung tâm trợ giúp</div>' +
            '<div style="font-size:10px;color:#7d7d8a">Chọn phần bạn muốn tìm hiểu</div>' +
          '</div>' +
        '</div>' +
        itemsHtml +
        '<div style="margin-top:12px;padding:10px;border-radius:10px;' +
            'background:rgba(124,93,250,0.08);border:1px solid rgba(124,93,250,0.15);' +
            'font-size:10px;color:#a78bfa;text-align:center">' +
          '💡 Mẹo: Bấm <b>Ctrl+K</b> để tìm task nhanh' +
        '</div>' +
      '</div>',
    showConfirmButton: false,
    showCloseButton: true,
    background: '#1a1b2e',
    color: '#fff',
    width: 440,
      // ✅ CHO PHÉP CLICK NGOÀI
    allowOutsideClick: true,
    allowEscapeKey: true
  });
}

// ═══ TOOLTIP NHANH (hover vào nút ?) ═══
function initHelpTooltips() {
  document.querySelectorAll('[data-help]').forEach(function(el) {
    var key = el.getAttribute('data-help');
    var content = HELP_CONTENT[key];
    if (!content) return;

    var tooltip = document.createElement('div');
    tooltip.className = 'help-tooltip';
    tooltip.innerHTML = '<b>' + content.title + '</b><br><span style="color:#9ca3af;font-size:10px">' + content.subtitle + '</span>';
    el.style.position = 'relative';
    el.appendChild(tooltip);
  });
}

// ═══ ONBOARDING TOUR (Lần đầu dùng) ═══
function startOnboardingTour() {
  var steps = [
    {
      title: '👋 Chào mừng!',
      text: 'Đây là **Weekly Workspace** — app quản lý công việc theo tuần. Hãy để tôi hướng dẫn bạn 5 bước cơ bản.',
      target: null,
      position: 'center'
    },
    {
      title: '📝 Thêm mục tiêu',
      text: 'Bắt đầu bằng cách nhập mục tiêu lớn vào ô này, rồi chia nhỏ thành các bước.',
      target: '#newGoalInput',
      position: 'bottom'
    },
    {
      title: '✅ Tick hoàn thành',
      text: 'Mỗi bước nhỏ có ô vuông để tick. Tick xong → **nhận XP** và bắn confetti 🎉',
      target: '#bigGoalsList',
      position: 'bottom'
    },
    {
      title: '🕐 Chuyển tuần',
      text: 'Bấm **◀ ▶** để xem tuần trước/sau. Bạn có thể lên kế hoạch cho tuần tới ngay bây giờ.',
      target: '.sidebar-week-controls',
      position: 'right'
    },
    {
      title: '🏆 Level & XP',
      text: 'Càng làm nhiều task, càng nhận nhiều **XP**. Lên level để mở khóa tính năng mới!',
      target: '#playerCard',
      position: 'right'
    },
    {
      title: '❓ Cần trợ giúp?',
      text: 'Bấm nút **?** ở header bất cứ lúc nào để xem lại hướng dẫn.',
      target: '#helpBtn',
      position: 'bottom'
    }
  ];

  var currentStep = 0;

  function showStep(index) {
    if (index >= steps.length) {
      localStorage.setItem('ws_onboarding_done', 'true');
      return;
    }

    var step = steps[index];
    var targetEl = step.target ? document.querySelector(step.target) : null;

    // Highlight target
    document.querySelectorAll('.onboarding-highlight').forEach(function(el) {
      el.classList.remove('onboarding-highlight');
    });

    if (targetEl) {
      targetEl.classList.add('onboarding-highlight');
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    Swal.fire({
      title: '',
      html:
        '<div style="text-align:left;padding:4px 0">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">' +
            '<span style="font-size:10px;color:#7d7d8a;font-weight:600">Bước ' + (index + 1) + ' / ' + steps.length + '</span>' +
            '<div style="display:flex;gap:3px">' +
              steps.map(function(_, i) {
                return '<span style="width:6px;height:6px;border-radius:50%;' +
                       'background:' + (i === index ? '#7c5dfa' : 'rgba(255,255,255,0.15)') + '"></span>';
              }).join('') +
            '</div>' +
          '</div>' +
          '<div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:6px">' + step.title + '</div>' +
          '<div style="font-size:12px;color:#9ca3af;line-height:1.6">' +
            step.text.replace(/\*\*(.+?)\*\*/g, '<b style="color:#fff">$1</b>') +
          '</div>' +
        '</div>',
      showCancelButton: index > 0,
      showConfirmButton: true,
      confirmButtonText: index === steps.length - 1 ? 'Bắt đầu thôi! 🚀' : 'Tiếp tục',
      cancelButtonText: 'Quay lại',
      confirmButtonColor: '#7c5dfa',
      cancelButtonColor: '#374151',
      background: '#1a1b2e',
      color: '#fff',
      width: 400,
      // ✅ CHO PHÉP CLICK NGOÀI ĐỂ BỎ QUA TOUR
      allowOutsideClick: true,
      allowEscapeKey: true,
      backdrop: 'rgba(0,0,0,0.7)',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then(function(result) {
      // Nếu user click ngoài hoặc ESC → dừng tour
      if (result.dismiss === Swal.DismissReason.backdrop || 
          result.dismiss === Swal.DismissReason.esc) {
        localStorage.setItem('ws_onboarding_done', 'true');
        document.querySelectorAll('.onboarding-highlight').forEach(function(el) {
          el.classList.remove('onboarding-highlight');
        });
        showTaskToast('👋 Đã bỏ qua hướng dẫn', 'Bấm nút ? ở header để xem lại khi cần');
        return;
      }
      if (result.isConfirmed) {
        showStep(index + 1);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        showStep(index - 1);
      }
    });
  }

  showStep(0);
}

// ═══ CHECK FIRST VISIT ═══
function checkFirstVisit() {
  if (localStorage.getItem('ws_onboarding_done') === 'true') return;
  
  // Đợi app load xong
  setTimeout(function() {
    if (document.getElementById('appMain') && 
        !document.getElementById('appMain').classList.contains('hidden')) {
      startOnboardingTour();
    }
  }, 2500);
}

// ═══ INIT ═══
(function initHelp() {
  // Tạo nút ? cho header nếu chưa có
  setTimeout(function() {
    var header = document.querySelector('#appMain header .flex.items-center.space-x-3');
    if (header && !document.getElementById('helpBtn')) {
      var btn = document.createElement('button');
      btn.id = 'helpBtn';
      btn.innerHTML = '<i class="fa-solid fa-circle-question text-sm"></i>';
      btn.className = 'text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition';
      btn.title = 'Hướng dẫn sử dụng';
      btn.onclick = function() { openHelpModal(); };
      header.insertBefore(btn, header.firstChild);
    }

    checkFirstVisit();
  }, 1500);
})();

// ═══ EXPOSE ═══
window.ww = window.ww || {};
window.ww.openHelpModal = openHelpModal;
window.ww.showHelpMenu = showHelpMenu;
window.ww.startOnboardingTour = startOnboardingTour;
window.ww.resetOnboarding = function() {
  localStorage.removeItem('ws_onboarding_done');
  Swal.fire({
    icon: 'success',
    title: 'Đã reset',
    text: 'Hướng dẫn sẽ hiện lại lần sau khi bạn vào app.',
    background: '#1a1b2e',
    color: '#fff'
  });
};


// ═══ ZOOM HELP IMAGE ═══
function zoomHelpImage(src, title) {
  Swal.fire({
    title: '',
    html:
      '<div style="text-align:center">' +
        '<div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:10px">' + title + '</div>' +
        '<img src="' + src + '" style="max-width:100%;height:auto;border-radius:12px;' +
             'border:1px solid rgba(124,93,250,0.3);box-shadow:0 12px 40px rgba(0,0,0,0.5)">' +
      '</div>',
    showConfirmButton: false,
    showCloseButton: true,
    background: '#1a1b2e',
    color: '#fff',
    width: 'auto',
    padding: '1.5em',
    allowOutsideClick: true,
    allowEscapeKey: true,
    customClass: {
      popup: 'help-zoom-popup'
    }
  });
}

// Expose
window.ww = window.ww || {};
window.ww.zoomHelpImage = zoomHelpImage;



console.log('✅ ui/help.js loaded');