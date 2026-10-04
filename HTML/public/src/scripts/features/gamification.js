// ═══════════════════════════════════════════════════════════════
// GAMIFICATION — XP, Level, Rewards
// ═══════════════════════════════════════════════════════════════

// ═══ XP CONFIG ═══
var XP_REWARDS = {
  SUBTASK_DONE: 3,
  GOAL_DONE: 15,
  GOAL_CREATE: 2,
  POMODORO_DONE: 10,
  QUEST_DONE: 30,
  STREAK_7: 100,
  STREAK_30: 300,
  STREAK_100: 500
};

// ═══ LEVEL CONFIG ═══
var LEVEL_REWARDS = {
  5: { type: 'theme', value: 'ocean', label: 'Theme Ocean' },
  10: { type: 'theme', value: 'sunset', label: 'Theme Sunset' },
  15: { type: 'badge', value: 'expert', label: 'Badge Chuyên gia' },
  20: { type: 'badge', value: 'master', label: 'Badge Bậc thầy' }
};

// ═══ XP CALCULATION ═══
function getXPForLevel(level) {
  // Level N cần N * 100 XP để lên N+1
  return level * 100;
}

function getTotalXPForLevel(level) {
  // Tổng XP cần để đạt level đó
  var total = 0;
  for (var i = 1; i < level; i++) {
    total += getXPForLevel(i);
  }
  return total;
}

function getLevelFromTotalXP(totalXP) {
  var level = 1;
  var remaining = totalXP;
  while (remaining >= getXPForLevel(level)) {
    remaining -= getXPForLevel(level);
    level++;
  }
  return level;
}

function getXPProgressInLevel(totalXP) {
  var level = getLevelFromTotalXP(totalXP);
  var xpAtCurrentLevel = getTotalXPForLevel(level);
  var xpInLevel = totalXP - xpAtCurrentLevel;
  var xpNeeded = getXPForLevel(level);
  return {
    level: level,
    xpInLevel: xpInLevel,
    xpNeeded: xpNeeded,
    percent: Math.round((xpInLevel / xpNeeded) * 100)
  };
}

// ═══ XP ACTIONS ═══
function addXP(amount, reason) {
  if (!state.gamification) {
    state.gamification = { xp: 0, level: 1, totalXP: 0, unlockedThemes: ['default'], unlockedBadges: [] };
  }

  var g = state.gamification;
  var oldLevel = getLevelFromTotalXP(g.totalXP || 0);

  g.totalXP = (g.totalXP || 0) + amount;
  g.xp = g.totalXP;

  var newLevel = getLevelFromTotalXP(g.totalXP);
  g.level = newLevel;

  // Update display
  updateGamificationDisplay();

  // Toast nhỏ khi nhận XP
  showXPGain(amount, reason);

  // Check level up
  if (newLevel > oldLevel) {
    handleLevelUp(newLevel);
  }

  saveStateToFirestore();
}

function showXPGain(amount, reason) {
  // Tạo floating text
  var el = document.createElement('div');
  el.className = 'xp-float';
  el.innerHTML = '+' + amount + ' XP';
  el.style.cssText = 'position:fixed;top:20%;left:50%;transform:translateX(-50%);' +
    'font-size:24px;font-weight:900;color:#fbbf24;' +
    'text-shadow:0 0 20px rgba(251,191,36,0.6);' +
    'pointer-events:none;z-index:99999;' +
    'animation:xpFloat 1.5s cubic-bezier(0.34,1.56,0.64,1) forwards';
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 1500);
}

function handleLevelUp(newLevel) {
  var reward = LEVEL_REWARDS[newLevel];
  var rewardText = reward ? 'Mở khóa: ' + reward.label : 'Tiếp tục cố gắng!';

  // Lưu reward
  var g = state.gamification;
  if (reward) {
    if (reward.type === 'theme' && g.unlockedThemes.indexOf(reward.value) < 0) {
      g.unlockedThemes.push(reward.value);
    }
    if (reward.type === 'badge' && g.unlockedBadges.indexOf(reward.value) < 0) {
      g.unlockedBadges.push(reward.value);
    }
  }

  // Hiển thị celebration
  Swal.fire({
    title: '🎉 LEVEL UP!',
    html: '<div style="text-align:center;padding:10px 0">' +
            '<div style="font-size:64px;margin:10px 0">⭐</div>' +
            '<div style="font-size:24px;font-weight:800;color:#fbbf24;margin:12px 0">Level ' + newLevel + '</div>' +
            '<div style="font-size:13px;color:#9ca3af;margin-top:8px">' + rewardText + '</div>' +
          '</div>',
    confirmButtonText: 'Tuyệt vời!',
    confirmButtonColor: '#7c5dfa',
    background: '#1a1b2e',
    color: '#fff',
    width: 400
  });

  // Confetti
  if (typeof fireConfetti === 'function') {
    fireConfetti({ count: 200 });
  }

  // Sound
  if (typeof playSound === 'function') {
    playSound('celebrate');
  }
}

// ═══ UI DISPLAY ═══
function updateGamificationDisplay() {
  var g = state.gamification || { totalXP: 0 };
  var info = getXPProgressInLevel(g.totalXP || 0);

  // ═══ Update TOP card (sidebar-player-card) ═══
  var levelEl = document.getElementById('playerLevel');
  var xpEl = document.getElementById('playerXP');
  var xpBarEl = document.getElementById('playerXPBar');

  if (levelEl) levelEl.textContent = 'Lv ' + info.level;
  if (xpEl) xpEl.textContent = info.xpInLevel + ' / ' + info.xpNeeded + ' XP';
  if (xpBarEl) xpBarEl.style.width = info.percent + '%';

  // ═══ Update BOTTOM card (user-card-level) ═══
  var miniLvlEl = document.getElementById('miniLevelText');
  var miniXpEl = document.getElementById('miniXPText');
  var miniBarEl = document.getElementById('miniXPBar');

  if (miniLvlEl) miniLvlEl.textContent = 'Lv ' + info.level;
  if (miniXpEl) miniXpEl.textContent = info.xpInLevel + '/' + info.xpNeeded + ' XP';
  if (miniBarEl) miniBarEl.style.width = info.percent + '%';
}

// ═══ INIT ═══
(function initGamification() {
  // Đợi state ready
  setTimeout(function() {
    updateGamificationDisplay();
  }, 500);
})();

// Expose
window.ww = window.ww || {};
window.ww.addXP = addXP;
window.ww.updateGamificationDisplay = updateGamificationDisplay;
window.ww.getXPProgressInLevel = getXPProgressInLevel;

console.log('✅ features/gamification.js loaded');