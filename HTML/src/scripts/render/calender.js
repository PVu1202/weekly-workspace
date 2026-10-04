// ═══════════════════════════════════════════════════════════════
// RENDER: CALENDAR — Lịch tuần 7 ngày
// ⚠️ CHỈ GIỮ 1 bản — bản có sortByPriority
// ═══════════════════════════════════════════════════════════════

function renderWeeklyCalendar(goals) {
  var grid = document.getElementById('weeklyCalendarGrid');
  if (!grid) return;

  grid.className = 'weekly-calendar-grid';

  var today = new Date();
  var currentDayNum = today.getDay();
  var currentDayKey = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][currentDayNum];

  var monday = new Date(today);
  var daysFromMon = (currentDayNum === 0) ? 6 : currentDayNum - 1;
  monday.setDate(today.getDate() - daysFromMon);

  var days = [
    { key:'Mon', label:'Thứ 2', short:'T2' },
    { key:'Tue', label:'Thứ 3', short:'T3' },
    { key:'Wed', label:'Thứ 4', short:'T4' },
    { key:'Thu', label:'Thứ 5', short:'T5' },
    { key:'Fri', label:'Thứ 6', short:'T6' },
    { key:'Sat', label:'Thứ 7', short:'T7' },
    { key:'Sun', label:'Chủ Nhật', short:'CN' }
  ];

  grid.innerHTML = days.map(function(day, idx) {
    var dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + idx);
    var dateStr = dayDate.getDate() + '/' + (dayDate.getMonth() + 1);

    var isToday = day.key === currentDayKey;
    var isWeekend = day.key === 'Sat' || day.key === 'Sun';

    var dayGoals = goals.filter(function(g) { return g.day === day.key; });

    var totalSubs = 0, doneSubs = 0;
    dayGoals.forEach(function(g) {
      (g.subtasks || []).forEach(function(s) {
        totalSubs++;
        if (s.completed) doneSubs++;
      });
    });
    var pct = totalSubs ? Math.round((doneSubs / totalSubs) * 100) : 0;

    dayGoals.sort(sortByPriority);

    var tasksHtml = '';
    if (dayGoals.length === 0) {
      tasksHtml = '<div class="calendar-empty-state">' +
        '<i class="fa-regular fa-calendar"></i>' +
        '<span>Chưa có công việc</span>' +
      '</div>';
    } else {
      var maxShow = 3;
      var showGoals = dayGoals.slice(0, maxShow);
      var remaining = dayGoals.length - maxShow;

      tasksHtml = '<div class="calendar-tasks-list">' +
        showGoals.map(function(goal) {
          var pr = goal.priority || 'medium';
          var subs = goal.subtasks || [];
          var done = subs.filter(function(s) { return s.completed; }).length;
          var goalDone = subs.length > 0 && done === subs.length;

          return '<div class="calendar-task-item priority-' + pr + (goalDone ? ' completed' : '') + '" ' +
                 'onclick="ww.selectWeekDay(\'' + day.key + '\'); ww.switchTab(\'breakoutTab\');" ' +
                 'title="' + escapeHtml(goal.title) + '">' +
            '<div class="calendar-task-title">' + escapeHtml(goal.title) + '</div>' +
            '<div class="calendar-task-meta">' +
              renderDeadlineBadge(goal) +
              '<span><i class="fa-regular fa-clock"></i> ' + (goal.estimatedHours || 0) + 'h</span>' +
              '<span><i class="fa-solid fa-list-check"></i> ' + done + '/' + subs.length + '</span>' +
              (goalDone ? '<span style="color:#4ade80"><i class="fa-solid fa-check"></i> Xong</span>' : '') +
            '</div>' +
          '</div>';
        }).join('') +
        (remaining > 0 ? '<div class="calendar-more-badge">+' + remaining + ' việc khác</div>' : '') +
      '</div>';
    }

    return '<div class="calendar-day-card' + (isToday ? ' today' : '') + (isWeekend ? ' weekend' : '') + '">' +
      '<div class="calendar-day-header">' +
        '<div class="calendar-day-info">' +
          '<div class="calendar-day-badge">' + day.short + '</div>' +
          '<div>' +
            '<div class="calendar-day-name">' + day.label +
              (isToday ? ' <span class="calendar-day-today-pill">Hôm nay</span>' : '') +
            '</div>' +
            '<div class="calendar-day-date">' + dateStr + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="calendar-day-percent' + (pct === 100 && totalSubs > 0 ? ' done' : '') + '">' + pct + '%</div>' +
      '</div>' +
      '<div class="calendar-progress-track">' +
        '<div class="calendar-progress-fill' + (pct === 100 && totalSubs > 0 ? ' done' : '') + '" style="width:' + pct + '%"></div>' +
      '</div>' +
      tasksHtml +
    '</div>';
  }).join('');
}

console.log('✅ render/calendar.js loaded');