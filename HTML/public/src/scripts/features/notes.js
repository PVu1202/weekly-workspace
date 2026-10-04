// ═══════════════════════════════════════════════════════════════
// NOTES — Ghi chú cho task
// ═══════════════════════════════════════════════════════════════

function openNotes(goalId) {
  var goal = state.goals.find(function(g) { return g.id === goalId; });
  if (!goal) return;

  var currentNotes = goal.notes || '';

  Swal.fire({
    title: '📝 Ghi chú',
    html: '<div style="text-align:left">' +
            '<div style="font-size:11px;color:#9ca3af;margin-bottom:8px;font-weight:600">' + escapeHtml(goal.title) + '</div>' +
            '<textarea id="notesInput" ' +
              'placeholder="Ghi chú, ý tưởng, link tham khảo..." ' +
              'style="width:100%;min-height:180px;padding:12px;border-radius:10px;' +
                     'background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);' +
                     'color:#fff;font-size:13px;font-family:inherit;resize:vertical;outline:none">' +
              escapeHtml(currentNotes) +
            '</textarea>' +
          '</div>',
    showCancelButton: true,
    confirmButtonText: '<i class="fa-solid fa-floppy-disk"></i> Lưu',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#7c5dfa',
    cancelButtonColor: '#374151',
    background: '#1a1b2e',
    color: '#fff',
    width: 480,
    didOpen: function() {
      var ta = document.getElementById('notesInput');
      if (ta) ta.focus();
    },
    preConfirm: function() {
      var ta = document.getElementById('notesInput');
      return ta ? ta.value : '';
    }
  }).then(function(result) {
    if (result.isConfirmed) {
      goal.notes = result.value || '';
      saveStateToFirestore();
      renderAll();
      showTaskToast('📝 Đã lưu ghi chú', goal.notes 
        ? 'Ghi chú dài ' + goal.notes.length + ' ký tự' 
        : 'Đã xóa ghi chú');
    }
  });
}

// Expose
window.ww = window.ww || {};
window.ww.openNotes = openNotes;

console.log('✅ features/notes.js loaded');