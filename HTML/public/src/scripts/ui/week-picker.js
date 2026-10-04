// ═══════════════════════════════════════════════════════════════
// WEEK PICKER — Custom week navigation
// ═══════════════════════════════════════════════════════════════

// Parse "2026-W40" → { year: 2026, week: 40 }
function parseWeekKey(weekKey) {
  var m = String(weekKey || '').match(/(\d{4})-W(\d{1,2})/);
  if (!m) return null;
  return { year: parseInt(m[1], 10), week: parseInt(m[2], 10) };
}

// Get Monday of ISO week
function getMondayOfISOWeek(year, week) {
  var jan4 = new Date(year, 0, 4);
  var jan4Day = jan4.getDay() || 7;
  var week1Monday = new Date(jan4);
  week1Monday.setDate(jan4.getDate() - (jan4Day - 1));

  var target = new Date(week1Monday);
  target.setDate(week1Monday.getDate() + (week - 1) * 7);
  return target;
}

// Get total ISO weeks in a year
function getISOWeeksInYear(year) {
  var d = new Date(year, 11, 31);
  var day = d.getDay() || 7;
  if (day === 4 || (day === 3 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0))) {
    return 53;
  }
  return 52;
}

// Format "06/10"
function formatDayMonth(date) {
  return String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0');
}

// Update display elements
function updateWeekDisplay() {
  var numEl = document.getElementById('weekNumberDisplay');
  var rangeEl = document.getElementById('weekRangeDisplay');
  var todayBtn = document.getElementById('weekTodayBtn');
  if (!numEl) return;

  var parsed = parseWeekKey(state.currentWeekKey);
  if (!parsed) return;

  numEl.textContent = 'Tuần ' + parsed.week + ' · ' + parsed.year;

  var monday = getMondayOfISOWeek(parsed.year, parsed.week);
  var sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  if (rangeEl) {
    rangeEl.textContent = formatDayMonth(monday) + ' → ' + formatDayMonth(sunday);
  }

  if (todayBtn) {
    var currentKey = getCurrentWeekCode();
    if (state.currentWeekKey === currentKey) {
      todayBtn.classList.add('is-current');
    } else {
      todayBtn.classList.remove('is-current');
    }
  }
}

// Shift week by delta (e.g. -1 for prev, +1 for next)
function shiftWeek(delta) {
  var parsed = parseWeekKey(state.currentWeekKey);
  if (!parsed) return;

  var newWeek = parsed.week + delta;
  var newYear = parsed.year;

  if (newWeek < 1) {
    newYear--;
    newWeek = getISOWeeksInYear(newYear);
  } else if (newWeek > getISOWeeksInYear(newYear)) {
    newYear++;
    newWeek = 1;
  }

  state.currentWeekKey = newYear + '-W' + (newWeek < 10 ? '0' + newWeek : newWeek);
  state.selectedProgressWeek = state.currentWeekKey;

  var wp = document.getElementById('weekPicker');
  if (wp) wp.value = state.currentWeekKey;

  updateWeekDisplay();
  if (typeof renderAll === 'function') renderAll();
}

function prevWeek() { shiftWeek(-1); }
function nextWeek() { shiftWeek(1); }

// Open native picker
function openWeekInput() {
  var input = document.getElementById('weekPicker');
  if (!input) return;
  input.value = state.currentWeekKey;

  try {
    if (typeof input.showPicker === 'function') {
      input.showPicker();
    } else {
      input.focus();
      input.click();
    }
  } catch (e) {
    input.focus();
    input.click();
  }
}

// Init
(function initWeekPicker() {
  var input = document.getElementById('weekPicker');
  if (!input) return;

  input.addEventListener('change', function(e) {
    if (e.target.value) {
      state.currentWeekKey = e.target.value;
      state.selectedProgressWeek = e.target.value;
      updateWeekDisplay();
      if (typeof renderAll === 'function') renderAll();
    }
  });

  // Initial display update (after state ready)
  setTimeout(updateWeekDisplay, 200);
})();

// Expose ra window
window.prevWeek = prevWeek;
window.nextWeek = nextWeek;
window.openWeekInput = openWeekInput;
window.updateWeekDisplay = updateWeekDisplay;

console.log('✅ ui/week-picker.js loaded');