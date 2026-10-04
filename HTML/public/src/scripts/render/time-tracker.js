// ═══════════════════════════════════════════════════════════════
// RENDER: TIME TRACKER — Bảng báo cáo thời gian
// ═══════════════════════════════════════════════════════════════

function renderTimeTrackerTable(goals) {
  var tbody = document.getElementById('timeTrackerTableBody');
  if (!tbody) return;

  if (!goals.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center p-4 text-gray-500">Chưa có dữ liệu.</td></tr>';
    return;
  }

  tbody.innerHTML = goals.map(function(g) {
    var diff = (g.actualHours - g.estimatedHours).toFixed(1);
    return '<tr class="hover:bg-white/5 transition">' +
      '<td class="p-3.5 font-medium text-white">' + escapeHtml(g.title) + '</td>' +
      '<td class="p-3.5"><span class="px-2 py-0.5 bg-gemini-accent/10 text-purple-300 rounded text-[10px]">' + getDayVN(g.day) + '</span></td>' +
      '<td class="p-3.5 text-gemini-blue font-semibold">' + g.estimatedHours + ' h</td>' +
      '<td class="p-3.5"><input type="number" step="0.5" min="0" value="' + g.actualHours + '" class="w-16 bg-black/40 border border-gemini-cardBorder rounded px-2 py-1 text-xs text-white" onchange="ww.updateActualHours(\'' + g.id + '\', this.value)"> h</td>' +
      '<td class="p-3.5 font-bold ' + (diff <= 0 ? 'text-gemini-emerald' : 'text-rose-400') + '">' + (diff > 0 ? '+' + diff : diff) + ' h</td>' +
    '</tr>';
  }).join('');
}

console.log('✅ render/time-tracker.js loaded');