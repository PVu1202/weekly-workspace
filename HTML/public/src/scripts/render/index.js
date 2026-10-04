// ═══════════════════════════════════════════════════════════════
// RENDER: INDEX — renderAll + renderStatsOnly + initUI + LiveTime
// ═══════════════════════════════════════════════════════════════

function updateLiveTime() {
  var el = document.getElementById('liveDateTime');
  if (!el) return;
  var now = new Date();
  el.innerText = now.toLocaleDateString('vi-VN', {
    weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
}

function initUI() {
  updateLiveTime();
  setInterval(updateLiveTime, 1000);

  var wp = document.getElementById('weekPicker');
  if (wp) {
    wp.value = state.currentWeekKey;
    wp.addEventListener('change', function(e) {
      if (e.target.value) {
        state.currentWeekKey = e.target.value;
        state.selectedProgressWeek = e.target.value;
        var days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        var t = getTodayDayKey();
        state.selectedWeekDay = days.indexOf(t) >= 0 ? t : 'Mon';
        renderAll();
      }
    });
  }

  var searchInput = document.getElementById('globalSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
  }
}

function renderStatsOnly() {
  var cg = state.goals.filter(function(g) { return g.weekKey === state.currentWeekKey; });
  var totalSub = 0, doneSub = 0, totalEst = 0, totalAct = 0;
  cg.forEach(function(g) {
    totalEst += parseFloat(g.estimatedHours) || 0;
    totalAct += parseFloat(g.actualHours) || 0;
    (g.subtasks || []).forEach(function(s) { totalSub++; if (s.completed) doneSub++; });
  });

  var pct = totalSub === 0 ? 0 : Math.round((doneSub / totalSub) * 100);

  var pctEl = document.getElementById('sidebarProgressPct');
  var barEl = document.getElementById('sidebarProgressBar');
  var badgeEl = document.getElementById('badge-tasks');
  if (pctEl) pctEl.innerText = pct + '%';
  if (barEl) barEl.style.width = pct + '%';
  if (badgeEl) badgeEl.innerText = totalSub;

  var aiBadge = document.getElementById('aiReminderBadge');
  if (aiBadge) aiBadge.classList.toggle('hidden', doneSub === totalSub || totalSub === 0);

  var estEl = document.getElementById('statTotalEst');
  var actEl = document.getElementById('statTotalAct');
  if (estEl) estEl.innerText = totalEst.toFixed(1) + ' giờ';
  if (actEl) actEl.innerText = totalAct.toFixed(1) + ' giờ';

  if (typeof checkWeeklyCompletion === 'function') checkWeeklyCompletion();
}

function renderAll() {
  try {
    updatePriorityCounts();
    renderWeeklyProgressBoard();
    renderAIDashboardPreview();
    var cg = state.goals.filter(function(g) { return g.weekKey === state.currentWeekKey; });
    renderBreakoutTasks(cg);
    renderWeeklyCalendar(cg);
    renderTimeTrackerTable(cg);
    renderStatsOnly();
  } catch (e) {
    console.error('Render error:', e);
  }
}

console.log('✅ render/index.js loaded');