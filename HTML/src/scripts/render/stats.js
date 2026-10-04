// ═══════════════════════════════════════════════════════════════
// RENDER: STATS — Dashboard thống kê + Charts + Achievements
// ═══════════════════════════════════════════════════════════════

// chartInstances đã được khai báo ở core/state.js

function calculateStats() {
  var allGoals = state.goals || [];
  var totalGoals = allGoals.length;

  var totalHours = 0;
  allGoals.forEach(function(g) {
    totalHours += parseFloat(g.actualHours) || 0;
  });

  var totalSubs = 0, doneSubs = 0;
  allGoals.forEach(function(g) {
    (g.subtasks || []).forEach(function(s) {
      totalSubs++;
      if (s.completed) doneSubs++;
    });
  });
  var completionRate = totalSubs ? Math.round((doneSubs / totalSubs) * 100) : 0;

  var streak = calculateStreak(allGoals);

  return {
    totalGoals: totalGoals,
    totalHours: totalHours,
    completionRate: completionRate,
    streak: streak,
    totalSubs: totalSubs,
    doneSubs: doneSubs
  };
}

function calculateStreak(goals) {
  var streak = 0;
  var hasActivity = goals.some(function(g) {
    return (g.subtasks || []).some(function(s) { return s.completed; });
  });

  if (hasActivity) streak = 1;

  var hoursSum = goals.reduce(function(sum, g) { return sum + (parseFloat(g.actualHours) || 0); }, 0);
  if (hoursSum > 0) streak = Math.max(streak, 1);

  return streak;
}

function renderStatsDashboard() {
  var stats = calculateStats();

  var el;
  el = document.getElementById('statsTotalGoals');
  if (el) el.innerText = stats.totalGoals;

  el = document.getElementById('statsTotalHours');
  if (el) el.innerText = stats.totalHours.toFixed(1) + 'h';

  el = document.getElementById('statsCompletionRate');
  if (el) el.innerText = stats.completionRate + '%';

  el = document.getElementById('statsStreak');
  if (el) el.innerHTML = stats.streak + ' <span class="text-xs text-gray-500">ngày</span>';

  renderWeeklyProgressChart();
  renderPriorityChart();
  renderByDayChart();
  renderAchievements(stats);
}

// ─── CHART 1: Weekly Progress ───
function renderWeeklyProgressChart() {
  var ctx = document.getElementById('chartWeeklyProgress');
  if (!ctx) return;

  var weeks = [];
  var completedData = [];
  var totalData = [];

  var now = new Date();
  for (var i = 6; i >= 0; i--) {
    var d = new Date(now);
    d.setDate(d.getDate() - (i * 7));
    var weekCode = getWeekCodeFromDate(d);
    weeks.push('T' + weekCode.split('-W')[1]);

    var weekGoals = state.goals.filter(function(g) { return g.weekKey === weekCode; });
    var weekSubs = 0, weekDone = 0;
    weekGoals.forEach(function(g) {
      (g.subtasks || []).forEach(function(s) {
        weekSubs++;
        if (s.completed) weekDone++;
      });
    });
    completedData.push(weekDone);
    totalData.push(weekSubs);
  }

  if (chartInstances.weekly) chartInstances.weekly.destroy();

  chartInstances.weekly = new Chart(ctx, {
    type: 'line',
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'Hoàn thành',
          data: completedData,
          borderColor: '#22d3ee',
          backgroundColor: 'rgba(34,211,238,.15)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#22d3ee',
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2
        },
        {
          label: 'Tổng số',
          data: totalData,
          borderColor: '#7c5dfa',
          backgroundColor: 'rgba(124,93,250,.08)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#7c5dfa',
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#9ca3af', font: { size: 10, weight: '600' }, boxWidth: 10, padding: 8 } },
        tooltip: {
          backgroundColor: '#1a1b2e',
          titleColor: '#fff',
          bodyColor: '#c4b5fd',
          borderColor: 'rgba(124,93,250,.3)',
          borderWidth: 1,
          padding: 8,
          titleFont: { size: 11 },
          bodyFont: { size: 11 }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,.04)', drawBorder: false }, ticks: { color: '#6b7280', font: { size: 10 } } },
        y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.04)', drawBorder: false }, ticks: { color: '#6b7280', font: { size: 10 }, stepSize: 2 } }
      }
    }
  });
}

// ─── CHART 2: Priority ───
function renderPriorityChart() {
  var ctx = document.getElementById('chartPriority');
  if (!ctx) return;

  var counts = { high: 0, medium: 0, low: 0 };
  state.goals.forEach(function(g) {
    var p = g.priority || 'medium';
    if (counts[p] !== undefined) counts[p]++;
  });

  if (chartInstances.priority) chartInstances.priority.destroy();

  chartInstances.priority = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['🔴 Cao', '🟡 Trung bình', '🟢 Thấp'],
      datasets: [{
        data: [counts.high, counts.medium, counts.low],
        backgroundColor: ['rgba(239,68,68,.8)', 'rgba(251,191,36,.8)', 'rgba(34,197,94,.8)'],
        borderColor: ['#ef4444', '#fbbf24', '#22c55e'],
        borderWidth: 2,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#9ca3af', font: { size: 10, weight: '600' }, boxWidth: 10, padding: 8 } },
        tooltip: {
          backgroundColor: '#1a1b2e',
          titleColor: '#fff',
          bodyColor: '#c4b5fd',
          borderColor: 'rgba(124,93,250,.3)',
          borderWidth: 1,
          padding: 8
        }
      }
    }
  });
}

// ─── CHART 3: By Day ───
function renderByDayChart() {
  var ctx = document.getElementById('chartByDay');
  if (!ctx) return;

  var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var labels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  var counts = [0, 0, 0, 0, 0, 0, 0];
  var completed = [0, 0, 0, 0, 0, 0, 0];

  var cg = state.goals.filter(function(g) { return g.weekKey === state.currentWeekKey; });
  cg.forEach(function(g) {
    var idx = days.indexOf(g.day);
    if (idx >= 0) {
      counts[idx]++;
      var subs = g.subtasks || [];
      var done = subs.filter(function(s) { return s.completed; }).length;
      if (subs.length > 0 && done === subs.length) completed[idx]++;
    }
  });

  if (chartInstances.byDay) chartInstances.byDay.destroy();

  chartInstances.byDay = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Tổng',
          data: counts,
          backgroundColor: 'rgba(124,93,250,.55)',
          borderColor: '#7c5dfa',
          borderWidth: 1,
          borderRadius: 6,
          barThickness: 20
        },
        {
          label: 'Hoàn thành',
          data: completed,
          backgroundColor: 'rgba(16,185,129,.65)',
          borderColor: '#10b981',
          borderWidth: 1,
          borderRadius: 6,
          barThickness: 20
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#9ca3af', font: { size: 10, weight: '600' }, boxWidth: 10, padding: 8 } },
        tooltip: {
          backgroundColor: '#1a1b2e',
          titleColor: '#fff',
          bodyColor: '#c4b5fd',
          borderColor: 'rgba(124,93,250,.3)',
          borderWidth: 1,
          padding: 8
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#6b7280', font: { size: 10 } } },
        y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#6b7280', font: { size: 10 }, stepSize: 1 } }
      }
    }
  });
}

// ─── ACHIEVEMENTS ───
function renderAchievements(stats) {
  var container = document.getElementById('achievementsList');
  if (!container) return;

  var achievements = [
    { id: 'first', icon: 'fa-seedling', name: 'Khởi đầu', desc: 'Tạo 1 mục tiêu đầu tiên', unlocked: stats.totalGoals >= 1 },
    { id: 'five', icon: 'fa-star', name: 'Ngôi sao nhỏ', desc: 'Hoàn thành 5 bước', unlocked: stats.doneSubs >= 5 },
    { id: 'ten', icon: 'fa-medal', name: 'Nỗ lực', desc: 'Tạo 10 mục tiêu', unlocked: stats.totalGoals >= 10 },
    { id: 'complete', icon: 'fa-check-double', name: 'Hoàn hảo', desc: 'Hoàn thành 100%', unlocked: stats.completionRate === 100 && stats.totalSubs > 0 },
    { id: 'hours10', icon: 'fa-clock', name: 'Chăm chỉ', desc: '10 giờ làm việc', unlocked: stats.totalHours >= 10 },
    { id: 'hours50', icon: 'fa-hourglass-half', name: 'Bền bỉ', desc: '50 giờ làm việc', unlocked: stats.totalHours >= 50 },
    { id: 'streak3', icon: 'fa-fire', name: 'Chuỗi 3 ngày', desc: 'Hoạt động 3 ngày', unlocked: stats.streak >= 3 },
    { id: 'allHigh', icon: 'fa-crown', name: 'Ưu tiên cao', desc: 'Có 5 task ưu tiên cao', unlocked: state.goals.filter(function(g) { return (g.priority || 'medium') === 'high'; }).length >= 5 }
  ];

  container.innerHTML = achievements.map(function(a) {
    return '<div class="achievement-item ' + (a.unlocked ? 'unlocked' : 'locked') + '" title="' + a.desc + '">' +
      '<div class="achievement-icon"><i class="fa-solid ' + a.icon + '"></i></div>' +
      '<div class="min-w-0">' +
        '<div class="achievement-name truncate">' + a.name + '</div>' +
        '<div class="achievement-desc truncate">' + a.desc + '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

console.log('✅ render/stats.js loaded');