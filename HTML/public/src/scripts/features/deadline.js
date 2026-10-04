// ═══════════════════════════════════════════════════════════════
// DEADLINE — Info + Badge + Auto reminder
// ═══════════════════════════════════════════════════════════════

function getDeadlineInfo(deadlineStr) {
  if (!deadlineStr) return null;

  var deadline = new Date(deadlineStr);
  if (isNaN(deadline.getTime())) return null;

  var now = new Date();
  var diffMs = deadline - now;
  var diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  var diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

  if (diffMs < 0) {
    var overdueDays = Math.abs(Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    var overdueHours = Math.abs(Math.floor(diffMs / (1000 * 60 * 60)));
    return {
      status: 'overdue',
      text: overdueDays > 0 ? 'Trễ ' + overdueDays + ' ngày' : 'Trễ ' + overdueHours + 'h',
      class: 'deadline-overdue',
      icon: 'fa-solid fa-triangle-exclamation'
    };
  }

  if (diffDays === 0) {
    return {
      status: 'today',
      text: 'Hôm nay ' + deadline.getHours() + ':' + String(deadline.getMinutes()).padStart(2, '0'),
      class: 'deadline-today',
      icon: 'fa-solid fa-fire'
    };
  }

  if (diffDays <= 2) {
    return {
      status: 'soon',
      text: 'Còn ' + diffDays + ' ngày',
      class: 'deadline-soon',
      icon: 'fa-solid fa-hourglass-half'
    };
  }

  return {
    status: 'normal',
    text: 'Còn ' + diffDays + ' ngày',
    class: 'deadline-normal',
    icon: 'fa-regular fa-calendar'
  };
}

function renderDeadlineBadge(goal) {
  var info = getDeadlineInfo(goal.deadline);
  if (!info) return '';
  return '<span class="deadline-badge ' + info.class + '" title="Hạn: ' + new Date(goal.deadline).toLocaleString('vi-VN') + '">' +
    '<i class="' + info.icon + '"></i> ' + info.text +
  '</span>';
}

function checkDeadlines() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  var now = Date.now();
  var lastCheck = Number(localStorage.getItem('ws_deadline_last_check') || 0);
  var oneHour = 60 * 60 * 1000;

  if (now - lastCheck < oneHour) return;
  localStorage.setItem('ws_deadline_last_check', String(now));

  var upcoming = [];
  var overdue = [];

  state.goals.forEach(function(g) {
    if (!g.deadline) return;
    var subs = g.subtasks || [];
    var allDone = subs.length > 0 && subs.every(function(s) { return s.completed; });
    if (allDone) return;

    var info = getDeadlineInfo(g.deadline);
    if (!info) return;

    if (info.status === 'overdue') overdue.push(g);
    else if (info.status === 'today' || info.status === 'soon') upcoming.push(g);
  });

  if (overdue.length > 0) {
    new Notification('🚨 Có ' + overdue.length + ' task trễ hạn!', {
      body: overdue.slice(0, 3).map(function(g) { return '• ' + g.title; }).join('\n'),
      tag: 'deadline-overdue'
    });
  } else if (upcoming.length > 0) {
    new Notification('⏰ Sắp đến hạn', {
      body: upcoming.slice(0, 3).map(function(g) { return '• ' + g.title; }).join('\n'),
      tag: 'deadline-upcoming'
    });
  }
}

// Chạy mỗi 30 phút + lần đầu sau 5s
setInterval(checkDeadlines, 30 * 60 * 1000);
setTimeout(checkDeadlines, 5000);

console.log('✅ features/deadline.js loaded');