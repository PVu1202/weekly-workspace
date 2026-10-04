// ═══════════════════════════════════════════════════════════════
// RENDER: AI DASHBOARD — Context + Preview
// ═══════════════════════════════════════════════════════════════

function buildAIPlannerContext() {
  var todayKey = getTodayDayKey();
  var todayIndex = getDayIndex(todayKey);
  var cg = state.goals.filter(function(g) { return g.weekKey === state.currentWeekKey; });
  var dueTasks = [], futureTasks = [];

  cg.forEach(function(goal) {
    (goal.subtasks || []).forEach(function(sub) {
      if (sub.completed) return;
      var idx = getDayIndex(goal.day);
      var item = {
        task: sub.text,
        goal: goal.title,
        day: goal.day,
        priority: goal.priority || 'medium',
        dayName: getDayVN(goal.day),
        estimatedHours: goal.estimatedHours || 0,
        overdue: idx < todayIndex,
        isToday: idx === todayIndex
      };
      if (idx <= todayIndex) dueTasks.push(item);
      else futureTasks.push(item);
    });
  });

  return {
    today: new Date().toLocaleDateString('vi-VN'),
    todayKey: todayKey,
    todayName: getDayVN(todayKey),
    tasks: dueTasks,
    futureTasks: futureTasks,
    totalPending: dueTasks.length + futureTasks.length,
    totalSubtasks: cg.reduce(function(sum, g) { return sum + (g.subtasks || []).length; }, 0)
  };
}

function renderAIDashboardPreview() {
  var ctx = buildAIPlannerContext();
  var todayList = document.getElementById('aiTodayTaskList');
  var todayCount = document.getElementById('aiTodayCount');
  var weekCount = document.getElementById('aiWeekCount');
  var badge = document.getElementById('aiTaskBadge');
  var priority = document.getElementById('aiPriorityText');
  var hero = document.getElementById('aiHeroMessage');

  if (todayCount) todayCount.innerText = ctx.tasks.length;
  if (weekCount) weekCount.innerText = ctx.totalPending;
  if (badge) badge.innerText = ctx.tasks.length + ' việc';

  var todayTasks = ctx.tasks.filter(function(t) { return t.isToday; })
                          .sort(function(a, b) {
                            var pa = PRIORITY_ORDER[a.priority || 'medium'] || 2;
                            var pb = PRIORITY_ORDER[b.priority || 'medium'] || 2;
                            return pa - pb;
                          });

  var actionable = ctx.tasks.length ? ctx.tasks : ctx.futureTasks;
  if (priority) priority.innerText = (actionable[0] && actionable[0].task) || 'Chưa có';

  if (hero) {
    if (ctx.totalPending === 0 && ctx.totalSubtasks > 0) hero.innerHTML = '🎉 Bạn đã hoàn thành toàn bộ công việc!';
    else if (ctx.totalPending === 0) hero.innerHTML = '📝 Tuần này chưa có công việc. Thêm mục tiêu để bắt đầu.';
    else if (ctx.tasks.length) hero.innerHTML = '💡 Bạn còn <b class="text-white">' + ctx.tasks.length + ' việc</b> cần xử lý.';
    else hero.innerHTML = '📅 Hôm nay chưa có task. Còn <b class="text-white">' + ctx.totalPending + ' task</b> trong tuần.';
  }

  if (!todayList) return;

  if (!todayTasks.length) {
    todayList.innerHTML = ctx.tasks.length
      ? ctx.tasks.slice(0, 3).map(function(t, i) {
          return '<div class="ai-task-row ' + (i===0?'priority':'') + ' rounded-2xl p-3.5 flex items-center gap-3">' +
            '<div class="ai-number">' + (i+1) + '</div>' +
            '<div class="min-w-0 flex-1">' +
              '<p class="text-xs font-bold text-white truncate">' + escapeHtml(t.task) + '</p>' +
              '<p class="text-[10px] text-gray-500 mt-1">' + (t.overdue?'⏰ Đang trễ':'📌 Cần xử lý') + ' • ' + escapeHtml(t.goal) + '</p>' +
            '</div>' +
          '</div>';
        }).join('')
      : '<div class="p-5 text-center text-xs text-gray-500">Chưa có công việc đến hạn hôm nay.</div>';
    return;
  }

  todayList.innerHTML = todayTasks.slice(0, 5).map(function(t, i) {
    return '<div class="ai-task-row ' + (i===0?'priority':'') + ' rounded-2xl p-3.5 flex items-center gap-3">' +
      '<div class="ai-number">' + (i+1) + '</div>' +
      '<div class="min-w-0 flex-1">' +
        '<div class="flex items-center gap-2">' +
          '<p class="text-xs font-bold text-white truncate">' + escapeHtml(t.task) + '</p>' +
          (i===0?'<span class="text-[9px] px-2 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/15">Ưu tiên</span>':'') +
        '</div>' +
        '<p class="text-[10px] text-gray-500 mt-1">Mục tiêu: ' + escapeHtml(t.goal) + ' • ' + (t.estimatedHours || 0) + 'h</p>' +
      '</div>' +
    '</div>';
  }).join('');
}

console.log('✅ render/ai-dashboard.js loaded');