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

console.log('✅ features/goals.js loaded');