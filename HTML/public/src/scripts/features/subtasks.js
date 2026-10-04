// ═══════════════════════════════════════════════════════════════
// SUBTASKS — Inline edit + Toggle + Add + Delete
// ═══════════════════════════════════════════════════════════════

function makeSubtaskEditable(el, goalId, subtaskId) {
  if (el.getAttribute('contenteditable') === 'true') return;

  var originalText = el.textContent;
  el.setAttribute('contenteditable', 'true');
  el.classList.add('editing');
  el.focus();

  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  function saveEdit() {
    var newText = el.textContent.trim();
    el.setAttribute('contenteditable', 'false');
    el.classList.remove('editing');

    if (newText === '') {
      el.textContent = originalText;
      return;
    }
    if (newText === originalText) return;

    var goal = state.goals.find(function(g) { return g.id === goalId; });
    if (!goal) return;
    var sub = goal.subtasks.find(function(s) { return s.id === subtaskId; });
    if (!sub) return;

    sub.text = newText;
    saveStateToFirestore();

    el.classList.add('saved');
    setTimeout(function() { el.classList.remove('saved'); }, 600);

    showTaskToast('✏️ Đã lưu', 'Đã cập nhật: ' + (newText.length > 40 ? newText.substring(0, 40) + '...' : newText));
  }

  function cancelEdit() {
    el.textContent = originalText;
    el.setAttribute('contenteditable', 'false');
    el.classList.remove('editing');
  }

  el.onblur = function() { saveEdit(); };

  el.onkeydown = function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      el.blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
      el.blur();
    }
  };
}

// Expose ra window cho onclick inline
window.editSubtask = function(goalId, subtaskId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  var el = event && event.currentTarget ? event.currentTarget : document.activeElement;
  makeSubtaskEditable(el, goalId, subtaskId);
};

function toggleSubtask(goalId, subtaskId) {
  var goal = state.goals.find(function(g) { return g.id === goalId; });
  if (!goal) return;
  var sub = goal.subtasks.find(function(s) { return s.id === subtaskId; });
  if (!sub) return;

  sub.completed = !sub.completed;
  saveStateToFirestore();
  renderAll();

  if (sub.completed) {
    var done = goal.subtasks.filter(function(s) { return s.completed; }).length;
    var total = goal.subtasks.length;

      if (typeof addXP === 'function') {
    if (done === total) {
      addXP(XP_REWARDS.GOAL_DONE, 'Hoàn thành task');   // +15
    } else {
      addXP(XP_REWARDS.SUBTASK_DONE, 'Hoàn thành bước'); // +3
    }
  }

    var clickX = window.event ? window.event.clientX : window.innerWidth / 2;
    var clickY = window.event ? window.event.clientY : window.innerHeight / 2;
    createSparkle(clickX, clickY);

    if (done === total) {
      showTaskToast('🎉 Hoàn thành mục tiêu!', 'Bạn đã hoàn thành tất cả ' + total + ' bước nhỏ.');
      showCelebration('🎉', 'Hoàn thành mục tiêu!', goal.title, { confettiCount: 150, soundType: 'celebrate' });
    } else {
      playSound('complete');
      showTaskToast('✅ Task đã hoàn thành!', sub.text + ' • Tiến độ ' + done + '/' + total);
    }

    checkStreakCelebration();
  }
}

// ═══ Custom Subtask (từ nút Thêm) ═══
function addCustomSubtask(goalId) {
  var input = document.getElementById('addSub_' + goalId);
  if (!input) return;
  var text = input.value.trim();
  if (!text) return;
  var goal = state.goals.find(function(g) { return g.id === goalId; });
  if (!goal) return;
  if (!goal.subtasks) goal.subtasks = [];
  goal.subtasks.push({
    id: 'st_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    text: text,
    completed: false
  });
  saveStateToFirestore();
  renderAll();
  setTimeout(function() {
    var newInput = document.getElementById('addSub_' + goalId);
    if (newInput) newInput.focus();
  }, 50);
}

function deleteSubtask(goalId, subtaskId) {
  var goal = state.goals.find(function(g) { return g.id === goalId; });
  if (!goal || !goal.subtasks) return;
  var sub = goal.subtasks.find(function(s) { return s.id === subtaskId; });
  var subName = sub ? (sub.text || 'này') : 'này';
  Swal.fire({
    title: 'Xóa bước nhỏ?',
    html: 'Xóa: <b class="text-rose-300">' + escapeHtml(subName) + '</b>?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#374151',
    background: '#1a1b2e',
    color: '#fff'
  }).then(function(res) {
    if (res.isConfirmed) {
      goal.subtasks = goal.subtasks.filter(function(s) { return s.id !== subtaskId; });
      saveStateToFirestore();
      renderAll();
    }
  });
}

// ═══ Edit subtask kiểu input (dùng cho button ✏️) ═══
function editSubtaskInput(goalId, subtaskId) {
  var goal = state.goals.find(function(g) { return g.id === goalId; });
  if (!goal) return;
  var sub = goal.subtasks.find(function(s) { return s.id === subtaskId; });
  if (!sub) return;
  var row = document.querySelector('[data-subtask-id="' + subtaskId + '"]');
  if (!row) return;
  var textEl = row.querySelector('.subtask-text');
  if (!textEl) return;
  var oldText = sub.title || sub.text || '';
  textEl.outerHTML = '<input type="text" class="subtask-edit-input" id="editSub_' + subtaskId + '" value="' + escapeHtml(oldText) + '">';
  var input = document.getElementById('editSub_' + subtaskId);
  if (!input) return;
  input.focus();
  input.select();
  function save() {
    var newText = input.value.trim();
    if (newText && newText !== oldText) {
      sub.text = newText;
      saveStateToFirestore();
    }
    renderAll();
  }
  input.addEventListener('blur', save);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); save(); }
    if (e.key === 'Escape') { renderAll(); }
  });
}

console.log('✅ features/subtasks.js loaded');