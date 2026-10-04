// ═══════════════════════════════════════════════════════════════
// CELEBRATION — Confetti + Sound + Sparkle
// ═══════════════════════════════════════════════════════════════

function playSound(type) {
  if (!soundEnabled) return;
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'complete') {
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'celebrate') {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.12);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.24);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    }
  } catch (e) {
    console.warn('Sound error:', e);
  }
}

function fireConfetti(options) {
  if (typeof confetti === 'undefined') {
    console.warn('Confetti library chưa load');
    return;
  }
  var opts = options || {};
  var count = opts.count || 100;
  var spread = opts.spread || 90;
  var origin = opts.origin || { y: 0.6 };

  confetti({
    particleCount: count,
    spread: spread,
    origin: origin,
    colors: ['#7c5dfa', '#3b82f6', '#22d3ee', '#10b981', '#ec4899', '#fbbf24'],
    disableForReducedMotion: true
  });
}

function showCelebration(emoji, title, text, options) {
  var opts = options || {};
  var badge = document.getElementById('celebrationBadge');
  if (!badge) return;

  document.getElementById('celebrationEmoji').textContent = emoji;
  document.getElementById('celebrationTitle').textContent = title;
  document.getElementById('celebrationText').textContent = text;

  badge.classList.remove('show');
  void badge.offsetWidth;
  badge.classList.add('show');

  if (opts.confetti !== false) {
    fireConfetti({ count: opts.confettiCount || 100 });
  }

  if (opts.sound !== false) {
    playSound(opts.soundType || 'celebrate');
  }

  setTimeout(function() {
    badge.classList.remove('show');
  }, 2500);
}

function createSparkle(x, y) {
  var emojis = ['✨', '⭐', '💫', '🌟'];
  for (var i = 0; i < 3; i++) {
    var s = document.createElement('div');
    s.className = 'sparkle-particle';
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
    s.style.top = (y + (Math.random() - 0.5) * 40) + 'px';
    document.body.appendChild(s);
    setTimeout(function(el) {
      return function() { el.remove(); };
    }(s), 800);
  }
}

// ═══ WEEKLY COMPLETION CELEBRATION ═══
function checkWeeklyCompletion() {
  var cg = state.goals.filter(function(g) { return g.weekKey === state.currentWeekKey; });
  if (cg.length === 0) return;

  var totalSubs = 0, doneSubs = 0;
  cg.forEach(function(g) {
    (g.subtasks || []).forEach(function(s) {
      totalSubs++;
      if (s.completed) doneSubs++;
    });
  });

  if (totalSubs === 0 || doneSubs < totalSubs) return;

  var lastCelebrated = localStorage.getItem('ws_week_celebrated_' + state.currentWeekKey);
  if (lastCelebrated === 'true') return;

  localStorage.setItem('ws_week_celebrated_' + state.currentWeekKey, 'true');

  setTimeout(function() {
    showCelebration(
      '🏆',
      'Hoàn thành cả tuần!',
      'Bạn đã xong ' + totalSubs + ' bước trong ' + cg.length + ' mục tiêu',
      { confettiCount: 250, soundType: 'celebrate' }
    );

    setTimeout(function() {
      fireConfetti({ count: 200, origin: { x: 0, y: 0.6 }, spread: 60 });
    }, 300);
    setTimeout(function() {
      fireConfetti({ count: 200, origin: { x: 1, y: 0.6 }, spread: 60 });
    }, 500);
  }, 500);
}

function checkStreakCelebration() {
  var streakEl = document.getElementById('statsStreak');
  var streak = parseInt(streakEl ? streakEl.innerText : '0');
  if (streak > 0 && streak % 7 === 0) {
    var lastCelebrated = localStorage.getItem('ws_streak_' + streak);
    if (lastCelebrated === 'true') return;
    localStorage.setItem('ws_streak_' + streak, 'true');

    setTimeout(function() {
      showCelebration(
        '🔥',
        'Chuỗi ' + streak + ' ngày!',
        'Bạn đang rất kiên trì!',
        { confettiCount: 100, soundType: 'success' }
      );
    }, 800);
  }
}

console.log('✅ ui/celebration.js loaded');