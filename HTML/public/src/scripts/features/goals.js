// ═══════════════════════════════════════════════════════════════
// GOALS — CRUD mục tiêu lớn + Priority filter
// ═══════════════════════════════════════════════════════════════

function createNewBigGoal() {
  var titleInput = document.getElementById('newGoalInput');
  var estInput = document.getElementById('newGoalEst');
  var dayInput = document.getElementById('newGoalDay');
  var priorityInput = document.getElementById('newGoalPriority');
  var deadlineInput = document.getElementById('newGoalDeadline');
  var weekInput = document.getElementById('newGoalWeek');    
  var title = titleInput.value.trim();
  if (!title) {
    Swal.fire({ icon:'warning', title:'Thông báo', text:'Vui lòng nhập tên mục tiêu!', background:'#1a1b2e', color:'#fff' });
    return;
  }
  var ts = Date.now();
  var weekOffset = weekInput ? parseInt(weekInput.value, 10) || 0 : 0;
  var targetWeekKey = state.currentWeekKey;
  if (weekOffset > 0) {
    targetWeekKey = shiftWeekKeyByOffset(state.currentWeekKey, weekOffset);
  }
  state.goals.push({
    id: 'g_' + ts,
    weekKey: targetWeekKey,
    title: title,
    notes: '',
    day: dayInput.value || 'Mon',
    estimatedHours: parseFloat(estInput.value) || 2,
    actualHours: 0,
    priority: priorityInput.value || 'medium',
    deadline: deadlineInput && deadlineInput.value ? deadlineInput.value : null,
    subtasks: [
      { id: 'st_' + ts + '_1', text: 'Chuẩn bị tài liệu & nguồn lực', completed: false },
      { id: 'st_' + ts + '_2', text: 'Thực hiện nội dung cốt lõi', completed: false },
      { id: 'st_' + ts + '_3', text: 'Kiểm tra & hoàn thiện sản phẩm', completed: false }
    ],
    createdAt: new Date().toISOString()
  });

  // ✅ THÊM: Cấp XP
  if (typeof addXP === 'function') {
    addXP(XP_REWARDS.GOAL_CREATE, 'Tạo task mới');  // +2
  }

saveStateToFirestore();
renderAll();
  saveStateToFirestore();
  renderAll();
  titleInput.value = '';
  estInput.value = '';
  if (deadlineInput) deadlineInput.value = '';
  if (weekInput) weekInput.value = '0';
  // Toast hiển thị tuần đích
  var toastMsg = weekOffset > 0 
  ? 'Đã tạo mục tiêu cho ' + formatWeekLabel(targetWeekKey)
  : 'Đã tạo mục tiêu!';
  Swal.fire({ 
  icon: 'success', 
  title: 'Thành công', 
  text: toastMsg, 
  timer: 1200, 
  showConfirmButton: false, 
  background: '#1a1b2e', 
  color: '#fff' 
  });
}

function deleteGoal(goalId) {
  Swal.fire({
    didOpen: function() {
      var auth = document.getElementById('authScreen');
      if (auth) {
        auth.removeAttribute('aria-hidden');
        auth.style.pointerEvents = 'none';
      }
    },
    didClose: function() {
      var auth = document.getElementById('authScreen');
      if (auth) auth.style.pointerEvents = '';
    },
    title: 'Xóa mục tiêu?',
    text: 'Bạn có chắc chắn muốn xóa mục tiêu này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#374151',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    background: '#1a1b2e',
    color: '#fff'
  }).then(function(res) {
    if (res.isConfirmed) {
      state.goals = state.goals.filter(function(g) { return g.id !== goalId; });
      saveStateToFirestore();
      renderAll();
    }
  });
}

function updateActualHours(goalId, value) {
  var g = state.goals.find(function(x) { return x.id === goalId; });
  if (g) {
    g.actualHours = parseFloat(value) || 0;
    saveStateToFirestore();
    renderStatsOnly();
  }
}

function cyclePriority(goalId) {
  var goal = state.goals.find(function(g) { return g.id === goalId; });
  if (!goal) return;

  var current = goal.priority || 'medium';
  var next = { low: 'medium', medium: 'high', high: 'low' }[current];
  goal.priority = next;

  saveStateToFirestore();
  renderAll();

  showTaskToast('🔄 Đổi ưu tiên', 'Task: ' + goal.title + ' → ' + getPriorityLabel(next));
}

function updatePriorityCounts() {
  var cg = state.goals.filter(function(g) { return g.weekKey === state.currentWeekKey; });
  var counts = { all: cg.length, high: 0, medium: 0, low: 0 };

  cg.forEach(function(g) {
    var p = g.priority || 'medium';
    if (counts[p] !== undefined) counts[p]++;
  });

  ['all', 'high', 'medium', 'low'].forEach(function(k) {
    var el = document.querySelector('[data-count="' + k + '"]');
    if (el) el.innerText = counts[k];
  });
}

function setPriorityFilter(filter) {
  state.priorityFilter = filter;

  document.querySelectorAll('.priority-filter-btn').forEach(function(btn) {
    if (btn.dataset.filter === filter) {
      btn.classList.add('active', 'ring-1', 'ring-cyan-400/30');
    } else {
      btn.classList.remove('active', 'ring-1', 'ring-cyan-400/30');
    }
  });

  renderAll();
  console.log('🔍 Filter:', filter);
}

// ═══════════════════════════════════════════════════════════════
// DELETE WEEK — Xóa toàn bộ task của một tuần
// ═══════════════════════════════════════════════════════════════

function deleteWeek(weekKey) {
  if (!weekKey) return;

  // Bảo vệ: không cho xóa tuần hiện tại
  if (weekKey === state.currentWeekKey) {
    Swal.fire({
      icon: 'warning',
      title: 'Không thể xóa',
      text: 'Đây là tuần hiện tại. Không thể xóa tuần đang làm việc.',
      background: '#1a1b2e',
      color: '#fff'
    });
    return;
  }

  var goalsInWeek = state.goals.filter(function(g) { return g.weekKey === weekKey; });
  if (goalsInWeek.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Tuần trống',
      text: 'Tuần này không có mục tiêu nào để xóa.',
      background: '#1a1b2e',
      color: '#fff'
    });
    return;
  }

  // Đếm thống kê
  var totalSubs = 0;
  var doneSubs = 0;
  goalsInWeek.forEach(function(g) {
    (g.subtasks || []).forEach(function(s) {
      totalSubs++;
      if (s.completed) doneSubs++;
    });
  });

  var weekLabel = formatWeekLabel(weekKey);

  // Cảnh báo đặc biệt nếu có task đã hoàn thành
  var warningExtra = doneSubs > 0
    ? '<div style="margin-top:10px;padding:8px 10px;border-radius:8px;' +
        'background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);' +
        'color:#fca5a5;font-size:11px;line-height:1.5">' +
        '⚠️ Tuần này có <b>' + doneSubs + ' bước đã hoàn thành</b>. ' +
        'Xóa sẽ mất toàn bộ dữ liệu và <b>không thể hoàn tác</b>.' +
      '</div>'
    : '';

  Swal.fire({
    icon: 'warning',
    title: '🗑️ Xóa ' + weekLabel + '?',
    html:
      '<div style="text-align:left;font-size:13px;line-height:1.6">' +
        '<div style="padding:10px;border-radius:10px;background:rgba(255,255,255,0.04);' +
            'border:1px solid rgba(255,255,255,0.08);margin-bottom:8px">' +
          '<div style="display:flex;justify-content:space-between;padding:4px 0">' +
            '<span style="color:#9ca3af">Số mục tiêu:</span>' +
            '<span style="color:#fff;font-weight:700">' + goalsInWeek.length + '</span>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;padding:4px 0">' +
            '<span style="color:#9ca3af">Tổng bước nhỏ:</span>' +
            '<span style="color:#fff;font-weight:700">' + totalSubs + '</span>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;padding:4px 0">' +
            '<span style="color:#9ca3af">Đã hoàn thành:</span>' +
            '<span style="color:#10b981;font-weight:700">' + doneSubs + '</span>' +
          '</div>' +
        '</div>' +
        warningExtra +
        '<div style="margin-top:8px;color:#9ca3af;font-size:11px">' +
          'Hành động này sẽ xóa vĩnh viễn toàn bộ mục tiêu và bước nhỏ của tuần này.' +
        '</div>' +
      '</div>',
    showCancelButton: true,
    confirmButtonText: '<i class="fa-solid fa-trash-can"></i> Xóa tuần',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#374151',
    background: '#1a1b2e',
    color: '#fff',
    width: 440,
    focusCancel: true
  }).then(function(result) {
    if (!result.isConfirmed) return;

    // Xóa goals
    state.goals = state.goals.filter(function(g) { return g.weekKey !== weekKey; });

    // Nếu tuần đang xem trong chi tiết = tuần bị xóa → reset về tuần hiện tại
    if (state.selectedProgressWeek === weekKey) {
      state.selectedProgressWeek = state.currentWeekKey;
    }

    saveStateToFirestore();
    renderAll();

    // Toast thành công
    Swal.fire({
      icon: 'success',
      title: 'Đã xóa tuần',
      html: 'Đã xóa <b>' + goalsInWeek.length + '</b> mục tiêu của ' + weekLabel + '.',
      timer: 1800,
      showConfirmButton: false,
      background: '#1a1b2e',
      color: '#fff'
    });

    if (typeof playSound === 'function') playSound('complete');
  });
}

// Expose
window.ww = window.ww || {};
window.ww.deleteWeek = deleteWeek;


console.log('✅ features/goals.js loaded');