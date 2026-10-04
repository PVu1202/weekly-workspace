// ═══════════════════════════════════════════════════════════════
// RENDER: WEEKLY PROGRESS — Tuần progress + Chi tiết ngày
// ═══════════════════════════════════════════════════════════════

function renderWeeklyProgressBoard() {
  var board = document.getElementById('weeklyProgressBoard');
  var viewer = document.getElementById('selectedWeekDetails');
  if (!board) return;

  var weekKeys = [];
  state.goals.forEach(function(g) {
    if (g.weekKey && weekKeys.indexOf(g.weekKey) < 0) weekKeys.push(g.weekKey);
  });
  if (state.currentWeekKey && weekKeys.indexOf(state.currentWeekKey) < 0) weekKeys.push(state.currentWeekKey);
  weekKeys.sort(function(a, b) { return b.localeCompare(a); });

  if (!weekKeys.length) {
    board.innerHTML = '<div class="col-span-full rounded-2xl border border-dashed border-violet-400/30 p-8 text-center">' +
      '<div class="text-4xl mb-3">📝</div>' +
      '<div class="text-sm font-bold text-white mb-1">Chưa có công việc nào</div>' +
      '<div class="text-xs text-gray-500 mb-3">Thêm mục tiêu lớn ở khung phía trên để bắt đầu</div>' +
      '<button onclick="document.getElementById(\'newGoalInput\').focus()" class="text-xs px-4 py-2 rounded-lg bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 transition">' +
        '<i class="fa-solid fa-plus mr-1"></i> Thêm mục tiêu đầu tiên' +
      '</button>' +
    '</div>';
    if (viewer) { viewer.innerHTML = ''; viewer.style.display = 'none'; }
    return;
  }

  if (!state.selectedProgressWeek || weekKeys.indexOf(state.selectedProgressWeek) < 0) {
    state.selectedProgressWeek = (state.currentWeekKey && weekKeys.indexOf(state.currentWeekKey) >= 0) ? state.currentWeekKey : weekKeys[0];
  }

  board.innerHTML = weekKeys.map(function(weekKey) {
    var goals = state.goals.filter(function(g) { return g.weekKey === weekKey; });
    var subs = [];
    goals.forEach(function(g) { subs = subs.concat(g.subtasks || []); });
    var total = subs.length;
    var done = subs.filter(function(s) { return s.completed; }).length;
    var pct = total ? Math.round(done / total * 100) : 0;
    var remaining = Math.max(total - done, 0);
    var isSelected = weekKey === state.selectedProgressWeek;
    var isCurrent = weekKey === state.currentWeekKey;

    return '<button type="button" onclick="ww.selectWeekFromProgress(\'' + weekKey + '\')" class="week-progress-card ' + (isSelected ? 'current ring-1 ring-cyan-400/20' : '') + ' text-left rounded-2xl border border-white/10 bg-black/20 p-4 w-full">' +
      '<div class="flex items-center justify-between gap-3">' +
        '<div class="min-w-0">' +
          '<div class="flex items-center gap-2 flex-wrap">' +
            '<span class="text-sm font-extrabold text-white">' + formatWeekLabel(weekKey) + '</span>' +
            (isCurrent ? '<span class="text-[9px] px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">Tuần hiện tại</span>' : '') +
            (isSelected ? '<span class="text-[9px] px-2 py-0.5 rounded-full bg-violet-400/10 border border-violet-400/20 text-violet-300">Đang xem</span>' : '') +
          '</div>' +
          '<p class="text-[10px] text-gray-500 mt-1">' + goals.length + ' mục tiêu • ' + done + '/' + total + ' bước • ' + remaining + ' còn lại</p>' +
        '</div>' +
        '<span class="text-base font-extrabold ' + (pct === 100 && total ? 'text-emerald-300' : 'text-cyan-300') + '">' + pct + '%</span>' +
      '</div>' +
      '<div class="week-progress-track mt-3"><div class="week-progress-fill ' + (pct === 100 && total ? 'done' : '') + '" style="width:' + pct + '%"></div></div>' +
    '</button>';
  }).join('');

  renderSelectedWeekDetails();
}

function renderSelectedWeekDetails() {
  var viewer = document.getElementById('selectedWeekDetails');
  if (!viewer) return;
  viewer.style.display = '';

  var weekKey = state.selectedProgressWeek || state.currentWeekKey;
  var goals = state.goals.filter(function(g) { return g.weekKey === weekKey; });

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
  if (!days.some(function(d) { return d.key === state.selectedWeekDay; })) {
    state.selectedWeekDay = days.some(function(d) { return d.key === todayKey; }) ? todayKey : 'Mon';
  }

  var subs = [];
  goals.forEach(function(g) { subs = subs.concat(g.subtasks || []); });
  var total = subs.length;
  var done = subs.filter(function(s) { return s.completed; }).length;
  var pct = total ? Math.round((done / total) * 100) : 0;
  var remaining = Math.max(total - done, 0);

  var selectedDay = state.selectedWeekDay;
  var sd = days.find(function(d) { return d.key === selectedDay; }) || days[0];
  var selectedGoals = goals.filter(function(g) { return g.day === selectedDay; }).sort(sortByPriority);

  if (state.searchQuery) {
    selectedGoals = selectedGoals.filter(function(g) {
      var titleMatch = (g.title || '').toLowerCase().includes(state.searchQuery);
      var subMatch = (g.subtasks || []).some(function(s) {
        return (s.text || '').toLowerCase().includes(state.searchQuery);
      });
      return titleMatch || subMatch;
    });
  }

  var sSubs = [];
  selectedGoals.forEach(function(g) { sSubs = sSubs.concat(g.subtasks || []); });
  var sDone = sSubs.filter(function(s) { return s.completed; }).length;
  var sTotal = sSubs.length;
  var sPct = sTotal ? Math.round((sDone / sTotal) * 100) : 0;

  viewer.innerHTML = '<div class="week-selected-viewer">' +
    '<div class="week-selected-head">' +
      '<div>' +
        '<div class="flex items-center gap-2">' +
          '<i class="fa-solid fa-calendar-days text-violet-300"></i>' +
          '<h3 class="text-sm font-extrabold text-white">Lịch làm việc — ' + formatWeekLabel(weekKey) + '</h3>' +
        '</div>' +
        '<p class="text-[10px] text-gray-500 mt-1">Chọn một ngày bên dưới để xem chi tiết.</p>' +
      '</div>' +
      '<div class="text-right shrink-0">' +
        '<div class="text-lg font-extrabold ' + (pct === 100 && total ? 'text-emerald-300' : 'text-cyan-300') + '">' + pct + '%</div>' +
        '<div class="text-[9px] text-gray-500">' + done + '/' + total + ' bước • ' + remaining + ' còn lại</div>' +
      '</div>' +
    '</div>' +
    '<div class="week-progress-track mb-4"><div class="week-progress-fill ' + (pct === 100 && total ? 'done' : '') + '" style="width:' + pct + '%"></div></div>' +
    '<div class="week-day-picker">' +
      days.map(function(day) {
        var dGoals = goals.filter(function(g) { return g.day === day.key; });
        var dSubs = [];
        dGoals.forEach(function(g) { dSubs = dSubs.concat(g.subtasks || []); });
        var dDone = dSubs.filter(function(s) { return s.completed; }).length;
        var dPct = dSubs.length ? Math.round((dDone / dSubs.length) * 100) : 0;
        var active = day.key === selectedDay;
        var isToday = day.key === todayKey;
        return '<button type="button" onclick="ww.selectWeekDay(\'' + day.key + '\')" class="week-day-tab ' + (active ? 'active' : '') + ' ' + (isToday ? 'today' : '') + '">' +
          '<span class="week-day-tab-pill">' + day.short + '</span>' +
          '<span class="week-day-tab-info"><strong>' + day.label + '</strong><small>' + dGoals.length + ' việc • ' + dPct + '%</small></span>' +
          (isToday ? '<span class="week-day-today">Hôm nay</span>' : '') +
        '</button>';
      }).join('') +
    '</div>' +
    '<div class="week-day-schedule">' +
      '<div class="week-day-schedule-head">' +
        '<div class="flex items-center gap-2">' +
          '<span class="week-selected-day-pill ' + (selectedDay === todayKey ? 'today-pill' : '') + '">' + sd.short + '</span>' +
          '<div>' +
            '<h4 class="text-sm font-extrabold text-white">' + sd.label + (selectedDay === todayKey ? ' <span class="text-[9px] text-cyan-300">• Hôm nay</span>' : '') + '</h4>' +
            '<p class="text-[9px] text-gray-500">' + selectedGoals.length + ' công việc • ' + sDone + '/' + sTotal + ' bước • ' + sPct + '%</p>' +
          '</div>' +
        '</div>' +
        '<span class="week-day-schedule-percent">' + sPct + '%</span>' +
      '</div>' +
      '<div class="week-progress-track mb-4"><div class="week-progress-fill ' + (sPct === 100 && sTotal ? 'done' : '') + '" style="width:' + sPct + '%"></div></div>' +
      (selectedGoals.length ?
      '<div class="week-day-task-list">' + selectedGoals.map(function(goal) {
        var gSubs = goal.subtasks || [];
        var gDone = gSubs.filter(function(st) { return st.completed; }).length;
        var gPct = gSubs.length ? Math.round((gDone / gSubs.length) * 100) : 0;
        var pr = goal.priority || 'medium';

        return '<div class="week-day-task-card">' +
            '<div class="flex items-start justify-between gap-3">' +
                '<div class="min-w-0">' +
                    '<div class="mb-1"><span class="priority-badge ' + getPriorityClass(pr) + '">' + getPriorityLabel(pr) + '</span></div>' +
                    '<div class="week-selected-task-title">' + escapeHtml(goal.title) + '</div>' +
                    '<div class="week-selected-task-meta">⏱ ' + (goal.estimatedHours || 0) + ' giờ • ' + gDone + '/' + gSubs.length + ' bước</div>' +
                '</div>' +
                '<span class="week-day-task-percent">' + gPct + '%</span>' +
            '</div>' +
            '<div class="week-progress-track mt-2"><div class="week-progress-fill ' + (gPct === 100 && gSubs.length ? 'done' : '') + '" style="width:' + gPct + '%"></div></div>' +
            '<div class="week-day-subtask-list">' + gSubs.map(function(st) {
              return '<div class="week-day-subtask ' + (st.completed ? 'done' : '') + ' flex items-start gap-2" data-subtask-id="' + st.id + '">' +
                '<input type="checkbox" class="w-3.5 h-3.5 accent-violet-500 shrink-0 mt-0.5 cursor-pointer" ' + (st.completed ? 'checked' : '') + ' onchange="ww.toggleSubtask(\'' + goal.id + '\',\'' + st.id + '\')">' +
                '<span class="subtask-text-editable" onclick="event.preventDefault(); event.stopPropagation(); window.editSubtask(\'' + goal.id + '\',\'' + st.id + '\', event)">' +
                  escapeHtml(st.title || st.text || 'Bước cần làm') +
                '</span>' +
                '<i class="fa-solid fa-pen subtask-edit-hint"></i>' +
                '<div class="subtask-actions">' +
                  '<button class="subtask-action-btn" title="Sửa" onclick="ww.editSubtask(\'' + goal.id + '\',\'' + st.id + '\')"><i class="fa-solid fa-pen"></i></button>' +
                  '<button class="subtask-action-btn del" title="Xóa" onclick="ww.deleteSubtask(\'' + goal.id + '\',\'' + st.id + '\')"><i class="fa-solid fa-xmark"></i></button>' +
                '</div>' +
              '</div>';
            }).join('') +
            '<div class="subtask-add-form">' +
              '<input type="text" class="subtask-add-input" id="addSub_' + goal.id + '" placeholder="+ Thêm bước mới..." onkeydown="if(event.key===\'Enter\'){event.preventDefault();ww.addCustomSubtask(\'' + goal.id + '\');}">' +
              '<button class="subtask-add-btn" onclick="ww.addCustomSubtask(\'' + goal.id + '\')"><i class="fa-solid fa-plus"></i></button>' +
            '</div>' +
          '</div>';
        }).join('') + '</div>'
        : '<div class="week-day-empty-state"><div class="week-day-empty-icon"><i class="fa-regular fa-calendar"></i></div><strong>Chưa có công việc cho ' + sd.label + '</strong><span>Ngày này chưa được phân công.</span></div>'
      ) +
    '</div>' +
  '</div>';
}

console.log('✅ render/weekly-progress.js loaded');