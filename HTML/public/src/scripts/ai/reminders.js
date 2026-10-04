// ═══════════════════════════════════════════════════════════════
// AI: REMINDERS — Nhắc nhở thông minh
// ═══════════════════════════════════════════════════════════════

function sendAIProactiveReminder(force) {
  var ctx = buildAIPlannerContext();
  if (!ctx.totalPending) {
    if (window.__aiReminderTimer) clearInterval(window.__aiReminderTimer);
    window.__aiReminderTimer = null;
    return;
  }
  var task = ctx.tasks[0];
  if (!task) return;
  var now = Date.now();
  var last = Number(localStorage.getItem('weeklyWorkspace_aiReminderAt') || 0);
  if (!force && now - last < 30 * 60 * 1000) return;

  var title = task.overdue ? '⏰ AI Coach — Task đang trễ' : '🤖 AI Coach — Đến lúc làm việc';
  var body = task.overdue ? 'Task "' + task.task + '" chưa xong.' : 'Gợi ý: ' + task.task;

  showAIToast(title, body, { duration: 9000 });
  if ('Notification' in window && Notification.permission === 'granted') {
    try { new Notification(title, { body: body }); } catch (e) {}
  }
  localStorage.setItem('weeklyWorkspace_aiReminderAt', String(now));
}

function enableTaskNotifications() {
  var status = document.getElementById('notificationStatus');
  if (!('Notification' in window)) {
    if (status) status.innerText = 'Không hỗ trợ';
    return;
  }
  Notification.requestPermission().then(function(permission) {
    if (status) {
      status.innerText = permission === 'granted' ? 'Đang hoạt động' : 'Đã từ chối';
      status.className = permission === 'granted'
        ? 'text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300'
        : 'text-[10px] px-2 py-1 rounded-full bg-rose-500/10 text-rose-300';
    }
    if (permission === 'granted') {
      localStorage.setItem('weeklyWorkspace_aiNotifications', 'on');
      sendAIProactiveReminder(true);
      if (window.__aiReminderTimer) clearInterval(window.__aiReminderTimer);
      window.__aiReminderTimer = setInterval(function() {
        sendAIProactiveReminder(false);
      }, 5 * 60 * 1000);

      var t = document.getElementById('nextReminderText');
      if (t) t.innerText = '🤖 AI đã bật nhắc chủ động.';
      var s = document.getElementById('aiReminderSummary');
      if (s) s.innerText = 'Đang hoạt động';
    }
  });
}

console.log('✅ ai/reminders.js loaded');