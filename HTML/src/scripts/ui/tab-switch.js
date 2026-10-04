// ═══════════════════════════════════════════════════════════════
// TAB SWITCH — Chuyển tab + Animation
// ═══════════════════════════════════════════════════════════════

function switchTab(tabId) {
  // Ẩn tất cả tab
  document.querySelectorAll('.tab-content').forEach(function(el) {
    el.classList.add('hidden');
  });
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });

  var targetTab = document.getElementById(tabId);
  var targetNav = document.getElementById('nav-' + tabId);

  if (!targetTab) return;

  void targetTab.offsetWidth;
  targetTab.classList.remove('hidden');
  if (targetNav) targetNav.classList.add('active');

  targetTab.style.animation = 'none';
  void targetTab.offsetWidth;
  targetTab.style.animation = '';

  var children = targetTab.children;
  for (var i = 0; i < children.length; i++) {
    (function(child) {
      child.style.animation = 'none';
      void child.offsetWidth;
      child.style.animation = '';
    })(children[i]);
  }

  var headerTitle = document.getElementById('tabTitleHeader');
  var headerIcon = document.getElementById('tabIconHeader');
  if (headerTitle) {
    headerTitle.style.animation = 'none';
    void headerTitle.offsetWidth;
    headerTitle.style.animation = '';
  }
  if (headerIcon) {
    headerIcon.style.animation = 'none';
    void headerIcon.offsetWidth;
    headerIcon.style.animation = '';
  }

  if (tabId === 'breakoutTab') {
    if (headerTitle) headerTitle.innerText = 'Chia Nhỏ Nhiệm Vụ';
    if (headerIcon) headerIcon.innerHTML = '<i class="fa-solid fa-sitemap text-gemini-accent"></i>';
  } else if (tabId === 'calendarTab') {
    if (headerTitle) headerTitle.innerText = 'Lịch Tuần 7 Ngày';
    if (headerIcon) headerIcon.innerHTML = '<i class="fa-solid fa-calendar-week text-gemini-blue"></i>';
    var cgCal = state.goals.filter(function(g) { return g.weekKey === state.currentWeekKey; });
    if (typeof renderWeeklyCalendar === 'function') renderWeeklyCalendar(cgCal);
  } else if (tabId === 'timerTab') {
    if (headerTitle) headerTitle.innerText = 'Thời Gian & Pomodoro';
    if (headerIcon) headerIcon.innerHTML = '<i class="fa-solid fa-stopwatch text-gemini-cyan"></i>';
  } else if (tabId === 'aiCoachTab') {
    if (headerTitle) headerTitle.innerText = 'AI Coach & Nhắc Nhở';
    if (headerIcon) headerIcon.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles text-fuchsia-400"></i>';
    if (typeof renderAIDashboardPreview === 'function') renderAIDashboardPreview();
    setTimeout(function() {
      if (typeof getAIRecommendations === 'function') {
        getAIRecommendations({ silent: true });
      }
    }, 250);
  } else if (tabId === 'reviewTab') {
    if (headerTitle) headerTitle.innerText = 'Nhìn Lại Cuối Tuần';
    if (headerIcon) headerIcon.innerHTML = '<i class="fa-solid fa-clipboard-check text-gemini-emerald"></i>';
    if (typeof loadWeeklyReviewData === 'function') loadWeeklyReviewData();
  } else if (tabId === 'statsTab') {
    if (headerTitle) headerTitle.innerText = 'Thống Kê & Thành Tựu';
    if (headerIcon) headerIcon.innerHTML = '<i class="fa-solid fa-chart-line text-amber-400"></i>';
    setTimeout(function() {
      if (typeof renderStatsDashboard === 'function') renderStatsDashboard();
    }, 100);
  }
}

console.log('✅ ui/tab-switch.js loaded');