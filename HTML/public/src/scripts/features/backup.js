// ═══════════════════════════════════════════════════════════════
// BACKUP — Save/Load Firestore + Export/Import JSON
// ═══════════════════════════════════════════════════════════════

function saveStateToFirestore() {
  if (!firebase.user || !firebase.db) return;
  var uid = firebase.user.uid;
  autoBackupLocal();
  try {
    var ref = firestoreSdk.doc(firebase.db, 'artifacts', appId, 'users', uid, 'userData', 'plannerState');
    firestoreSdk.setDoc(ref, {
      goals: state.goals,
      reviews: state.reviews,
      gamification: state.gamification || {},
      updatedAt: new Date().toISOString()
    }, { merge: true }).catch(function(err) {
      console.warn('Firestore save error:', err);
      setSyncBadge('error');
    });
  } catch (e) {
    console.warn('saveState error:', e);
  }
}

function subscribeUserData(uid) {
  if (!firebase.db) return;
  setSyncBadge('connecting');
  try {
    var ref = firestoreSdk.doc(firebase.db, 'artifacts', appId, 'users', uid, 'userData', 'plannerState');
    firebase.unsub = firestoreSdk.onSnapshot(ref, function(snap) {
      if (snap.exists()) {
        var d = snap.data();
        state.goals = Array.isArray(d.goals) ? d.goals : [];
        state.reviews = d.reviews || {};

            // ✅ THÊM: Load gamification
        if (d.gamification && typeof d.gamification === 'object') {
          state.gamification = d.gamification;
        } else {
          state.gamification = state.gamification || {
            xp: 0, level: 1, totalXP: 0,
            unlockedThemes: ['default'],
            unlockedBadges: []
          };
        }
        
        // ✅ Update UI sau khi load
        if (typeof updateGamificationDisplay === 'function') {
          updateGamificationDisplay();
        }

      } else {
        // User mới → seed starter goals
        state.goals = getStarterGoals();
        state.reviews = {};
        setTimeout(function() { saveStateToFirestore(); }, 500);
        console.log('🌱 Đã seed starter goals cho user mới:', uid);
      }
      setSyncBadge('connected');
      renderAll();
    }, function(err) {
      console.warn('Firestore listener error:', err);
      setSyncBadge('error');
      renderAll();
    });
  } catch (e) {
    console.warn('Subscribe error:', e);
    setSyncBadge('error');
  }
}

function exportAllData() {
  try {
    var exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      user: {
        displayName: (firebase.user && firebase.user.displayName) || 'Unknown',
        email: (firebase.user && firebase.user.email) || '',
        uid: (firebase.user && firebase.user.uid) || ''
      },
      goals: state.goals,
      reviews: state.reviews,
      meta: {
        totalGoals: state.goals.length,
        totalReviews: Object.keys(state.reviews || {}).length,
        currentWeek: state.currentWeekKey
      }
    };

    var jsonStr = JSON.stringify(exportData, null, 2);
    var blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    var timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    a.href = url;
    a.download = 'weekly-workspace-backup-' + timestamp + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    Swal.fire({
      icon: 'success',
      title: 'Đã xuất dữ liệu!',
      html: '<div class="text-xs text-left text-gray-300">' +
            '<b>File:</b> weekly-workspace-backup-' + timestamp + '.json<br>' +
            '<b>Số mục tiêu:</b> ' + state.goals.length + '<br>' +
            '<b>Số đánh giá:</b> ' + Object.keys(state.reviews || {}).length + '<br><br>' +
            '<span class="text-gray-400">File đã được tải về máy bạn. Hãy cất giữ ở nơi an toàn.</span>' +
            '</div>',
      background: '#1a1b2e',
      color: '#fff'
    });
  } catch (err) {
    console.error('Export error:', err);
    Swal.fire({ icon: 'error', title: 'Lỗi xuất dữ liệu', text: err.message, background: '#1a1b2e', color: '#fff' });
  }
}

function importAllData() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';

  input.onchange = function(e) {
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(evt) {
      try {
        var data = JSON.parse(evt.target.result);

        if (!data.goals || !Array.isArray(data.goals)) {
          throw new Error('File không đúng định dạng — thiếu mảng "goals"');
        }

        Swal.fire({
          icon: 'warning',
          title: 'Xác nhận nhập dữ liệu?',
          html: '<div class="text-xs text-left text-gray-300">' +
                '<b>File:</b> ' + file.name + '<br>' +
                '<b>Xuất lúc:</b> ' + (data.exportedAt || 'Không rõ') + '<br>' +
                '<b>Chủ sở hữu:</b> ' + ((data.user && data.user.email) || 'Không rõ') + '<br>' +
                '<b>Số mục tiêu:</b> ' + data.goals.length + '<br>' +
                '<b>Số đánh giá:</b> ' + Object.keys(data.reviews || {}).length + '<br><br>' +
                '<span style="color:#ef4444;font-weight:700">⚠️ CẢNH BÁO: Dữ liệu hiện tại sẽ bị THAY THẾ!</span><br>' +
                '<span class="text-gray-400">Hãy chắc chắn bạn đã backup dữ liệu hiện tại trước.</span>' +
                '</div>',
          showCancelButton: true,
          confirmButtonText: 'Nhập & Thay thế',
          cancelButtonText: 'Hủy',
          confirmButtonColor: '#10b981',
          cancelButtonColor: '#6b7280',
          background: '#1a1b2e',
          color: '#fff'
        }).then(function(result) {
          if (!result.isConfirmed) return;
          state.goals = data.goals;
          state.reviews = data.reviews || {};
          saveStateToFirestore();
          renderAll();
          Swal.fire({
            icon: 'success',
            title: 'Nhập thành công!',
            text: 'Đã khôi phục ' + data.goals.length + ' mục tiêu',
            timer: 2000,
            showConfirmButton: false,
            background: '#1a1b2e',
            color: '#fff'
          });
        });
      } catch (err) {
        console.error('Import error:', err);
        Swal.fire({
          icon: 'error',
          title: 'File không hợp lệ',
          text: err.message || 'Không đọc được file JSON',
          background: '#1a1b2e',
          color: '#fff'
        });
      }
    };
    reader.readAsText(file);
  };

  input.click();
}

function autoBackupLocal() {
  try {
    var lastBackup = localStorage.getItem('weekly_ws_last_backup');
    var now = Date.now();
    var oneDay = 24 * 60 * 60 * 1000;

    if (!lastBackup || (now - Number(lastBackup)) > oneDay) {
      var backup = {
        version: '1.0',
        backedUpAt: new Date().toISOString(),
        goals: state.goals,
        reviews: state.reviews,
        gamification: state.gamification || {}
      };
      localStorage.setItem('weekly_ws_auto_backup', JSON.stringify(backup));
      localStorage.setItem('weekly_ws_last_backup', String(now));
      console.log('💾 Auto backup: đã lưu', state.goals.length, 'mục tiêu');
    }
  } catch (e) {
    console.warn('Auto backup failed:', e.message);
  }
}

console.log('✅ features/backup.js loaded');