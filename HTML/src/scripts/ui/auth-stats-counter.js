// ═══════════════════════════════════════════════════════════════
// AUTH STATS COUNTER — Animation đếm số trên auth screen
// ═══════════════════════════════════════════════════════════════

function animateAuthStats() {
  var stats = document.querySelectorAll('.auth-stat-value[data-count]');
  if (!stats.length) return;

  stats.forEach(function(el, index) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var hasUnit = el.querySelector('.auth-stat-unit');
    var unitHtml = hasUnit ? '<span class="auth-stat-unit">h</span>' : '';

    el.innerText = '0' + (hasUnit ? 'h' : '');
    el.classList.add('counting');

    setTimeout(function() {
      var duration = 1400;
      var startTime = performance.now();

      function update(now) {
        var elapsed = now - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);

        el.innerHTML = current + unitHtml;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.innerHTML = target + unitHtml;
          el.classList.remove('counting');
        }
      }

      requestAnimationFrame(update);
    }, 800 + index * 200);
  });
}

function initAuthStats() {
  var authScreen = document.getElementById('authScreen');
  if (authScreen && !authScreen.classList.contains('hidden')) {
    setTimeout(animateAuthStats, 700);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuthStats);
} else {
  initAuthStats();
}

// Re-run khi user logout (quay lại auth screen)
window.addEventListener('focus', function() {
  var authScreen = document.getElementById('authScreen');
  if (authScreen && !authScreen.classList.contains('hidden')) {
    setTimeout(animateAuthStats, 300);
  }
});

console.log('✅ ui/auth-stats-counter.js loaded');