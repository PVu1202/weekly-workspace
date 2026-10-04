// ═══════════════════════════════════════════════════════════════
// PARTICLES — Auth screen particles + Ambient mouse glow
// ═══════════════════════════════════════════════════════════════

// ═══ AMBIENT MOUSE GLOW ═══
(function initAmbientGlow() {
  var authScreen = document.getElementById('authScreen');
  if (!authScreen) return;

  var rafId = null;
  var mouseX = 50, mouseY = 50;

  authScreen.addEventListener('mousemove', function(e) {
    var rect = authScreen.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    if (rafId) return;
    rafId = requestAnimationFrame(function() {
      authScreen.style.setProperty('--mouse-x', mouseX + '%');
      authScreen.style.setProperty('--mouse-y', mouseY + '%');
      rafId = null;
    });
  });

  console.log('✨ Ambient glow initialized');
})();

// ═══ AUTH PARTICLES ═══
function generateAuthParticles() {
  var container = document.getElementById('authParticles');
  if (!container) return;
  if (container.children.length > 0) return;

  var particleCount = 20;

  for (var i = 0; i < particleCount; i++) {
    var p = document.createElement('div');
    p.className = 'particle';

    var size = Math.random() * 6 + 2;
    var leftPos = Math.random() * 100;
    var duration = Math.random() * 15 + 15;
    var delay = Math.random() * 10;

    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = leftPos + '%';
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = delay + 's';

    container.appendChild(p);
  }

  console.log('✨ Đã tạo ' + particleCount + ' particles');
}

// Tạo particles khi load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', generateAuthParticles);
} else {
  generateAuthParticles();
}

console.log('✅ ui/particles.js loaded');