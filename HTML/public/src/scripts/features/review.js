// ═══════════════════════════════════════════════════════════════
// REVIEW — Nhìn lại cuối tuần
// ═══════════════════════════════════════════════════════════════

function saveWeeklyReview() {
  state.reviews[state.currentWeekKey] = {
    ach1: (document.getElementById('reviewAch1') || {}).value || '',
    ach2: (document.getElementById('reviewAch2') || {}).value || '',
    ach3: (document.getElementById('reviewAch3') || {}).value || '',
    obstacles: (document.getElementById('reviewObstacles') || {}).value || '',
    lessons: (document.getElementById('reviewLessons') || {}).value || '',
    rating: (document.getElementById('reviewRating') || {}).value || '8',
    nextFocus: (document.getElementById('reviewNextFocus') || {}).value || ''
  };
  saveStateToFirestore();
  Swal.fire({ icon:'success', title:'Thành công', text:'Đã lưu phiếu nhìn lại!', timer:1200, showConfirmButton:false, background:'#1a1b2e', color:'#fff' });
}

function loadWeeklyReviewData() {
  var data = state.reviews[state.currentWeekKey] || {};
  var setVal = function(id, val) {
    var el = document.getElementById(id);
    if (el) el.value = val || '';
  };
  setVal('reviewAch1', data.ach1);
  setVal('reviewAch2', data.ach2);
  setVal('reviewAch3', data.ach3);
  setVal('reviewObstacles', data.obstacles);
  setVal('reviewLessons', data.lessons);
  setVal('reviewNextFocus', data.nextFocus);
  var rr = document.getElementById('reviewRating');
  if (rr) rr.value = data.rating || 8;
  var rv = document.getElementById('ratingVal');
  if (rv) rv.innerText = (data.rating || 8) + '/10';
}

function exportReviewReport() {
  var data = state.reviews[state.currentWeekKey] || {};
  var u = firebase.user || {};
  var text = '=========================================\n' +
    ' BÁO CÁO PHẢN TƯ CUỐI TUẦN: ' + state.currentWeekKey + '\n' +
    ' NGƯỜI DÙNG: ' + (u.displayName || u.email || 'User') + '\n' +
    '=========================================\n\n' +
    '1. THÀNH TỰU:\n - ' + (data.ach1 || '-') + '\n - ' + (data.ach2 || '-') + '\n - ' + (data.ach3 || '-') + '\n\n' +
    '2. KHÓ KHĂN: ' + (data.obstacles || 'Không có') + '\n\n' +
    '3. BÀI HỌC: ' + (data.lessons || 'Không có') + '\n\n' +
    '4. ĐIỂM: ' + (data.rating || 8) + '/10\n\n' +
    '5. MỤC TIÊU TUẦN TỚI: ' + (data.nextFocus || '-') + '\n';
  var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Weekly_Review_' + state.currentWeekKey + '.txt';
  a.click();
}

console.log('✅ features/review.js loaded');