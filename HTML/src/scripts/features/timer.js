// ═══════════════════════════════════════════════════════════════
// TIMER — Pomodoro 25 phút
// ═══════════════════════════════════════════════════════════════

function renderTimerDisplay() {
  var m = Math.floor(timer.seconds / 60);
  var s = timer.seconds % 60;
  var el = document.getElementById('timerDisplay');
  if (el) el.innerText = (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

function toggleTimer() {
  var btn = document.getElementById('startTimerBtn');
  var txt = document.getElementById('timerBtnText');
  if (timer.running) {
    clearInterval(timer.interval);
    timer.running = false;
    if (btn) { btn.classList.remove('bg-amber-500'); btn.classList.add('bg-gemini-cyan'); }
    if (txt) txt.innerText = 'Tiếp Tục';
  } else {
    timer.running = true;
    if (btn) { btn.classList.remove('bg-gemini-cyan'); btn.classList.add('bg-amber-500'); }
    if (txt) txt.innerText = 'Tạm Dừng';
    timer.interval = setInterval(function() {
      if (timer.seconds > 0) {
        timer.seconds--;
        renderTimerDisplay();
      } else {
        clearInterval(timer.interval);
        timer.running = false;
        Swal.fire({ icon:'info', title:'Hết giờ!', text:'Hoàn thành 25 phút Pomodoro!', background:'#1a1b2e', color:'#fff' });
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer.interval);
  timer.running = false;
  timer.seconds = 25 * 60;
  var btn = document.getElementById('startTimerBtn');
  var txt = document.getElementById('timerBtnText');
  if (btn) { btn.classList.remove('bg-amber-500'); btn.classList.add('bg-gemini-cyan'); }
  if (txt) txt.innerText = 'Bắt Đầu';
  renderTimerDisplay();
}

console.log('✅ features/timer.js loaded');