// ═══════════════════════════════════════════════════════════════
// STARTER GOALS — Seed data cho user mới
// ═══════════════════════════════════════════════════════════════

function getStarterGoals() {
  var weekKey = getCurrentWeekCode();
  var todayKey = getTodayDayKey();
  var ts = Date.now();
  return [
    {
      id: 'starter_' + ts + '_1',
      weekKey: weekKey,
      title: '📌 Ví dụ: Lập Kế Hoạch Công Việc Tuần',
      day: todayKey,
      estimatedHours: 3,
      actualHours: 0,
      subtasks: [
        { id: 'ss_' + ts + '_1', text: 'Xác định 3 mục tiêu ưu tiên nhất tuần này', completed: false },
        { id: 'ss_' + ts + '_2', text: 'Chia nhỏ mục tiêu thành các bước cụ thể', completed: false },
        { id: 'ss_' + ts + '_3', text: 'Đặt thời gian Pomodoro cho từng bước', completed: false }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: 'starter_' + ts + '_2',
      weekKey: weekKey,
      title: '✏️ Bạn có thể sửa/xóa task này bất cứ lúc nào',
      day: todayKey,
      estimatedHours: 1,
      actualHours: 0,
      subtasks: [
        { id: 'ss2_' + ts + '_1', text: 'Hover vào task để thấy nút sửa ✏️ và xóa ✕', completed: false },
        { id: 'ss2_' + ts + '_2', text: 'Thêm bước nhỏ bằng ô "+ Thêm bước mới" bên dưới', completed: false }
      ],
      createdAt: new Date().toISOString()
    }
  ];
}

console.log('✅ starter-goals.js loaded');