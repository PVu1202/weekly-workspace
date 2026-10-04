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
    illustration: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%237c5dfa"/><stop offset="100%" stop-color="%2322d3ee"/></linearGradient></defs><rect x="10" y="20" width="180" height="16" rx="4" fill="url(%23g1)" opacity="0.9"/><circle cx="26" cy="28" r="4" fill="white"/><rect x="40" y="24" width="80" height="3" rx="1.5" fill="white" opacity="0.9"/><rect x="40" y="30" width="50" height="2" rx="1" fill="white" opacity="0.5"/><rect x="10" y="48" width="180" height="16" rx="4" fill="%231a1b2e" stroke="%237c5dfa" stroke-width="1" opacity="0.9"/><circle cx="26" cy="56" r="4" fill="%2310b981"/><path d="M24 56 L25.5 58 L28.5 55" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/><rect x="40" y="52" width="80" height="3" rx="1.5" fill="%23a78bfa" opacity="0.9"/><rect x="10" y="76" width="180" height="16" rx="4" fill="%231a1b2e" stroke="%2322d3ee" stroke-width="1" opacity="0.9"/><circle cx="26" cy="84" r="4" fill="%2322d3ee"/><path d="M24 84 L25.5 86 L28.5 83" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/><rect x="40" y="80" width="80" height="3" rx="1.5" fill="%2367e8f9" opacity="0.9"/></svg>',
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
    illustration: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><rect x="10" y="15" width="180" height="90" rx="8" fill="%231a1b2e" stroke="%233b82f6" stroke-width="1" opacity="0.9"/><rect x="10" y="15" width="180" height="14" rx="8" fill="%233b82f6" opacity="0.3"/><line x1="37" y1="15" x2="37" y2="105" stroke="white" stroke-opacity="0.1"/><line x1="64" y1="15" x2="64" y2="105" stroke="white" stroke-opacity="0.1"/><line x1="91" y1="15" x2="91" y2="105" stroke="white" stroke-opacity="0.1"/><line x1="118" y1="15" x2="118" y2="105" stroke="white" stroke-opacity="0.1"/><line x1="145" y1="15" x2="145" y2="105" stroke="white" stroke-opacity="0.1"/><line x1="172" y1="15" x2="172" y2="105" stroke="white" stroke-opacity="0.1"/><rect x="14" y="35" width="20" height="18" rx="3" fill="%233b82f6" opacity="0.6"/><rect x="41" y="35" width="20" height="18" rx="3" fill="%2322d3ee" opacity="0.6"/><rect x="68" y="55" width="20" height="18" rx="3" fill="%237c5dfa" opacity="0.6"/><rect x="95" y="35" width="20" height="18" rx="3" fill="%233b82f6" opacity="0.6"/><rect x="122" y="55" width="20" height="18" rx="3" fill="%2310b981" opacity="0.6"/><rect x="149" y="35" width="20" height="18" rx="3" fill="%23fbbf24" opacity="0.6"/><rect x="149" y="75" width="20" height="18" rx="3" fill="%23ec4899" opacity="0.6"/></svg>',
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
    illustration: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2322d3ee"/><stop offset="100%" stop-color="%237c5dfa"/></linearGradient></defs><circle cx="100" cy="60" r="42" fill="%231a1b2e" stroke="url(%23g2)" stroke-width="4"/><circle cx="100" cy="60" r="36" fill="none" stroke="%2322d3ee" stroke-width="2" opacity="0.3"/><path d="M 100 60 L 100 32" stroke="%2322d3ee" stroke-width="3" stroke-linecap="round"/><path d="M 100 60 L 120 72" stroke="%237c5dfa" stroke-width="3" stroke-linecap="round"/><circle cx="100" cy="60" r="4" fill="%2322d3ee"/><text x="100" y="110" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="%2367e8f9">25:00</text><rect x="72" y="8" width="56" height="6" rx="3" fill="%2322d3ee" opacity="0.5"/></svg>',
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
    illustration: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><defs><radialGradient id="g3"><stop offset="0%" stop-color="%23d946ef" stop-opacity="0.4"/><stop offset="100%" stop-color="%23d946ef" stop-opacity="0"/></radialGradient></defs><circle cx="100" cy="60" r="55" fill="url(%23g3)"/><rect x="70" y="30" width="60" height="60" rx="12" fill="%231a1b2e" stroke="%23d946ef" stroke-width="2"/><circle cx="88" cy="52" r="5" fill="%23d946ef"/><circle cx="112" cy="52" r="5" fill="%23d946ef"/><rect x="85" y="68" width="30" height="3" rx="1.5" fill="%23d946ef" opacity="0.6"/><line x1="100" y1="30" x2="100" y2="20" stroke="%23d946ef" stroke-width="2" stroke-linecap="round"/><circle cx="100" cy="17" r="3" fill="%23fbbf24"/><rect x="78" y="15" width="8" height="2" rx="1" fill="%23a78bfa" opacity="0.6"/><rect x="114" y="15" width="8" height="2" rx="1" fill="%23a78bfa" opacity="0.6"/></svg>',
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
    illustration: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><rect x="15" y="15" width="80" height="40" rx="6" fill="%231a1b2e" stroke="%23fbbf24" stroke-width="1"/><rect x="22" y="28" width="30" height="4" rx="2" fill="%23fbbf24"/><rect x="22" y="38" width="55" height="8" rx="2" fill="%23fbbf24" opacity="0.4"/><rect x="105" y="15" width="80" height="40" rx="6" fill="%231a1b2e" stroke="%2310b981" stroke-width="1"/><rect x="112" y="28" width="30" height="4" rx="2" fill="%2310b981"/><rect x="112" y="38" width="55" height="8" rx="2" fill="%2310b981" opacity="0.4"/><rect x="15" y="65" width="170" height="45" rx="6" fill="%231a1b2e" stroke="%2322d3ee" stroke-width="1"/><polyline points="25,100 45,85 65,92 85,75 105,80 125,68 145,72 165,60" stroke="%2322d3ee" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="165" cy="60" r="3" fill="%2322d3ee"/><circle cx="45" cy="85" r="2" fill="%2322d3ee"/><circle cx="85" cy="75" r="2" fill="%2322d3ee"/></svg>',
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
    illustration: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><rect x="30" y="15" width="140" height="90" rx="8" fill="%231a1b2e" stroke="%2310b981" stroke-width="1.5"/><rect x="50" y="8" width="20" height="14" rx="3" fill="%2310b981"/><rect x="130" y="8" width="20" height="14" rx="3" fill="%2310b981"/><line x1="50" y1="45" x2="150" y2="45" stroke="%23ffffff" stroke-opacity="0.1"/><circle cx="60" cy="35" r="5" fill="%2310b981" opacity="0.4"/><rect x="72" y="32" width="70" height="3" rx="1.5" fill="%23ffffff" opacity="0.5"/><circle cx="60" cy="58" r="5" fill="%2310b981" opacity="0.4"/><rect x="72" y="55" width="60" height="3" rx="1.5" fill="%23ffffff" opacity="0.5"/><circle cx="60" cy="81" r="5" fill="%23fbbf24" opacity="0.6"/><rect x="72" y="78" width="75" height="3" rx="1.5" fill="%23ffffff" opacity="0.5"/><path d="M 140 92 L 145 96 L 152 88" stroke="%2310b981" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
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
    illustration: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><rect x="10" y="10" width="70" height="100" rx="6" fill="%231a1b2e" stroke="%237c5dfa" stroke-width="1.5"/><circle cx="30" cy="25" r="5" fill="%237c5dfa"/><rect x="42" y="22" width="30" height="6" rx="2" fill="%237c5dfa" opacity="0.6"/><rect x="20" y="42" width="50" height="14" rx="4" fill="%23fbbf24" opacity="0.4"/><text x="45" y="52" text-anchor="middle" font-family="sans-serif" font-size="7" font-weight="bold" fill="%23fbbf24">Lv 5</text><rect x="18" y="66" width="54" height="8" rx="3" fill="%237c5dfa" opacity="0.6"/><rect x="18" y="80" width="54" height="8" rx="3" fill="%233b82f6" opacity="0.6"/><rect x="18" y="94" width="54" height="8" rx="3" fill="%2310b981" opacity="0.6"/><rect x="90" y="10" width="100" height="100" rx="6" fill="%231a1b2e" stroke="%237c5dfa" stroke-width="0.5"/><rect x="100" y="25" width="80" height="20" rx="4" fill="%237c5dfa" opacity="0.2"/><rect x="100" y="55" width="80" height="20" rx="4" fill="%237c5dfa" opacity="0.2"/><rect x="100" y="85" width="80" height="15" rx="4" fill="%237c5dfa" opacity="0.2"/></svg>',
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
    ? '<div style="text-align:center;margin:12px 0">' +
        '<img src="' + content.illustration + '" ' +
             'alt="' + content.title + '" ' +
             'style="width:100%;max-width:380px;height:auto;border-radius:12px;' +
                    'border:1px solid rgba(124,93,250,0.2);' +
                    'box-shadow:0 8px 30px rgba(0,0,0,0.3)">' +
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

console.log('✅ ui/help.js loaded');