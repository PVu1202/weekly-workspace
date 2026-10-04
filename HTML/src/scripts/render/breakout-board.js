// ═══════════════════════════════════════════════════════════════
// RENDER: BREAKOUT BOARD — Daily board 7 cột
// ✅ ĐÃ FIX LỖI: Xóa đoạn return sớm với biến undefined
// ═══════════════════════════════════════════════════════════════

function renderBreakoutTasks(goals) {
  var container = document.getElementById('bigGoalsList');
  if (!container) return;

  var days = [
    { key:'Mon', label:'Thứ 2', short:'T2' },
    { key:'Tue', label:'Thứ 3', short:'T3' },
    { key:'Wed', label:'Thứ 4', short:'T4' },
    { key:'Thu', label:'Thứ 5', short:'T5' },
    { key:'Fri', label:'Thứ 6', short:'T6' },
    { key:'Sat', label:'Thứ 7', short:'T7' },
    { key:'Sun', label:'Chủ Nhật', short:'CN' }
  ];

  var todayKey = getTodayDayKey();

  // ─── ÁP DỤNG PRIORITY FILTER ───
  if (state.priorityFilter && state.priorityFilter !== 'all') {
    goals = goals.filter(function(g) {
      var p = g.priority || 'medium';
      return p === state.priorityFilter;
    });
  }

  // ─── ÁP DỤNG SEARCH FILTER ───
  if (state.searchQuery) {
    goals = goals.filter(function(g) {
      var titleMatch = (g.title || '').toLowerCase().includes(state.searchQuery);
      var subMatch = (g.subtasks || []).some(function(s) {
        return (s.text || '').toLowerCase().includes(state.searchQuery);
      });
      return titleMatch || subMatch;
    });
  }

  // Update count
  var countEl = document.getElementById('filterCount');
  if (countEl) {
    if (state.priorityFilter === 'all') {
      countEl.innerText = '';
    } else {
      countEl.innerText = 'Hiển thị ' + goals.length + ' mục tiêu';
    }
  }

  container.className = 'daily-board';
  container.innerHTML = days.map(function(day) {
    var dayGoals = goals.filter(function(g) { return g.day === day.key; })
                        .sort(sortByPriority);

    var total = 0, done = 0;
    dayGoals.forEach(function(g) {
      var subs = g.subtasks || [];
      total += subs.length;
      done += subs.filter(function(s) { return s.completed; }).length;
    });
    var pct = total ? Math.round((done / total) * 100) : 0;
    var isToday = day.key === todayKey;
    var isWeekend = day.key === 'Sat' || day.key === 'Sun';

    return '<div class="daily-column ' + (isToday ? 'today' : '') + ' ' + (isWeekend ? 'weekend' : '') + '">' +
      '<div class="daily-head">' +
        '<div class="daily-title">' +
          '<span class="daily-day-pill">' + day.short + '</span>' +
          '<div>' +
            '<div class="text-xs font-bold text-white">' + day.label + (isToday ? ' <span class="ml-1 text-[9px] text-cyan-300">• Hôm nay</span>' : '') + '</div>' +
            '<div class="text-[10px] text-gray-500 mt-0.5">' + dayGoals.length + ' mục tiêu • ' + done + '/' + total + ' bước</div>' +
          '</div>' +
        '</div>' +
        '<span class="text-[11px] font-extrabold ' + (pct === 100 && total ? 'text-emerald-300' : 'text-cyan-300') + '">' + pct + '%</span>' +
      '</div>' +
      '<div class="daily-progress-track"><div class="daily-progress-fill ' + (pct === 100 && total ? 'done' : '') + '" style="width:' + pct + '%"></div></div>' +
      (dayGoals.length ? dayGoals.map(function(goal) {
        var priority = goal.priority || 'medium';
        var subs = goal.subtasks || [];
        var completed = subs.filter(function(s) { return s.completed; }).length;
        var gpct = subs.length ? Math.round((completed / subs.length) * 100) : 0;
        var pending = subs.filter(function(s) { return !s.completed; }).length;

        return '<div class="daily-goal ' + getPriorityTaskClass(priority) + '">' +
            '<div class="flex items-start justify-between gap-2">' +
                '<div class="min-w-0 flex-1">' +
                    '<div class="mb-1 flex flex-wrap items-center gap-1">' +
                      '<span class="priority-badge ' + getPriorityClass(priority) + '">' + getPriorityLabel(priority) + '</span>' +
                      renderDeadlineBadge(goal) +
                    '</div>' +
                    '<div class="daily-goal-title">' + escapeHtml(goal.title) + '</div>' +
                    '<div class="daily-goal-meta">⏱ ' + (goal.estimatedHours || 0) + 'h • ' + completed + '/' + subs.length + ' bước' + (pending ? ' • còn ' + pending : ' • hoàn thành') + '</div>' +
                '</div>' +
                '<span class="text-[10px] font-bold ' + (gpct === 100 && subs.length ? 'text-emerald-300' : 'text-purple-300') + '">' + gpct + '%</span>' +
            '</div>' +
            '<div class="mt-2 h-1 rounded-full bg-white/5 overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style="width:' + gpct + '%"></div></div>' +
            '<div class="flex items-center justify-between mt-2">' +
                '<span class="text-[9px] ' + (pending ? 'text-gray-500' : 'text-emerald-300') + '">' + (pending ? 'Chưa hoàn tất' : '✓ Đã hoàn tất') + '</span>' +
                '<button onclick="ww.cyclePriority(\'' + goal.id + '\')" class="text-gray-600 hover:text-amber-400 transition mr-2" title="Đổi độ ưu tiên"><i class="fa-solid fa-arrows-rotate text-[10px]"></i></button>' +
                '<button onclick="ww.deleteGoal(\'' + goal.id + '\')" class="text-gray-600 hover:text-red-400 transition" title="Xóa mục tiêu"><i class="fa-solid fa-trash-can text-[10px]"></i></button>' +
            '</div>' +
        '</div>';
      }).join('') : '<div class="daily-empty"><i class="fa-regular fa-calendar text-lg mb-2 block"></i>Chưa có công việc</div>') +
    '</div>';
  }).join('');
}

console.log('✅ render/breakout-board.js loaded');