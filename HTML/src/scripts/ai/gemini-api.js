// ═══════════════════════════════════════════════════════════════
// AI: GEMINI API — Gọi Gemini để lấy gợi ý
// ═══════════════════════════════════════════════════════════════

function getAIRecommendations(options) {
  options = options || {};
  var silent = options.silent === true;
  var card = document.getElementById('aiRecommendationCard');
  var btn = document.getElementById('aiRecommendBtn');
  if (!card || !btn) return;

  var now = Date.now();
  if (silent && now - lastAICallAt < AI_COOLDOWN_MS) return;
  lastAICallAt = now;

  var ctx = buildAIPlannerContext();
  var cg = state.goals.filter(function(g) { return g.weekKey === state.currentWeekKey; });
  if (!cg.length) {
    card.innerHTML = '<div class="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400">Bạn chưa có công việc nào trong tuần này.</div>';
    return;
  }

  btn.disabled = true;
  btn.classList.add('opacity-60');
  var btnSpan = btn.querySelector('span');
  if (btnSpan) btnSpan.innerText = 'Đang xem...';
  card.innerHTML = '<div class="flex items-center gap-3 text-gray-400 text-xs"><i class="fa-solid fa-spinner fa-spin text-fuchsia-400"></i> Đang kiểm tra công việc...</div>';

  // Nếu Firebase AI không có → fallback local
  if (!firebase.aiModel) {
    var fbTasks = ctx.tasks.slice(0, 3);
    if (!fbTasks.length) {
      card.innerHTML = ctx.totalPending === 0
        ? '<div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs">🎉 Bạn đã hoàn thành toàn bộ công việc!</div>'
        : '<div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">📅 Hôm nay không có task. Còn ' + ctx.totalPending + ' task.</div>';
    } else {
      card.innerHTML = '<div class="space-y-3">' +
        '<div class="text-white font-semibold text-sm">📌 Hôm nay bạn có ' + ctx.tasks.length + ' việc</div>' +
        fbTasks.map(function(t, i) {
          return '<div class="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">' +
            '<div class="text-fuchsia-300 font-semibold">' + (i + 1) + '. ' + escapeHtml(t.task) + '</div>' +
            '<div class="text-gray-500 mt-1">Thuộc: ' + escapeHtml(t.goal) + '</div>' +
          '</div>';
        }).join('') +
        '<div class="text-gray-400 text-xs">💡 Bắt đầu với việc số 1 trước.</div>' +
      '</div>';
    }
    btn.disabled = false;
    btn.classList.remove('opacity-60');
    if (btnSpan) btnSpan.innerText = 'AI gợi ý cho tôi';
    return;
  }

  var prompt = 'Hôm nay là ' + ctx.today + ' (' + ctx.todayName + ').\n\n' +
    'Công việc CHƯA HOÀN THÀNH đã đến hạn:\n' + JSON.stringify(ctx.tasks, null, 2) + '\n\n' +
    'Công việc tương lai:\n' + JSON.stringify(ctx.futureTasks, null, 2) + '\n\n' +
    'QUAN TRỌNG: Nếu có task, phải nói còn công việc chưa hoàn thành. Nếu task overdue, ưu tiên nhắc. ' +
    'Trả lời ngắn gọn, tiếng Việt, tối đa 3 gợi ý, không tạo task mới.';

  // ═══ GỌI GEMINI API TRỰC TIẾP ═══
  var apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY;

  var systemPrompt = 'Bạn là AI Productivity Coach cho ứng dụng quản lý công việc. Chỉ đưa ra gợi ý thực tế, ngắn gọn, không phán xét. Ưu tiên: task đang trễ, task quan trọng, task có thể hoàn thành nhanh để tạo đà. Trả lời bằng tiếng Việt, tối đa 5 gợi ý.';

  var requestBody = {
    contents: [{
      parts: [{
        text: systemPrompt + '\n\n' + prompt
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024
    }
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  })
  .then(function(response) {
    if (!response.ok) {
      return response.json().then(function(err) {
        throw new Error(err.error ? err.error.message : 'HTTP ' + response.status);
      });
    }
    return response.json();
  })
  .then(function(data) {
    var text = '';
    try {
      text = data.candidates[0].content.parts[0].text;
    } catch (e) {
      throw new Error('Không parse được response từ Gemini');
    }

    var safeText = escapeHtml(text).replace(/\n/g, '<br>');
    card.innerHTML = '<div class="flex items-start gap-3">' +
      '<div class="w-9 h-9 rounded-xl bg-fuchsia-500/10 text-fuchsia-300 flex items-center justify-center shrink-0"><i class="fa-solid fa-lightbulb"></i></div>' +
      '<div class="min-w-0 text-xs text-gray-300 leading-6">' + safeText + '</div>' +
    '</div>';

    if (ctx.tasks.length) {
      var first = ctx.tasks[0];
      showAIToast(
        first.overdue ? '⏰ AI Coach — Task đang trễ' : '🤖 AI Coach có gợi ý',
        ctx.tasks.length + ' việc cần xử lý. Gợi ý: ' + first.task,
        { silent: silent }
      );
    } else if (ctx.totalPending === 0) {
      showAIToast('🎉 AI Coach', 'Bạn đã hoàn thành toàn bộ công việc!', { silent: silent });
    } else {
      showAIToast('📅 AI Coach', 'Hôm nay chưa có task. Còn ' + ctx.totalPending + ' task.', { silent: silent });
    }
  })
  .catch(function(error) {
    console.error('❌ Gemini API error:', error);
    var msg = error.message || 'Lỗi không xác định';
    var hint = '';
    if (msg.includes('quota') || msg.includes('429')) {
      hint = '<br><br><b>Gợi ý:</b> Đã hết quota. Đợi 1 phút rồi thử lại.';
    } else if (msg.includes('API_KEY_INVALID') || msg.includes('400')) {
      hint = '<br><br><b>Gợi ý:</b> API key sai. Kiểm tra lại.';
    } else if (msg.includes('SAFETY')) {
      hint = '<br><br><b>Gợi ý:</b> Nội dung bị chặn. Thử lại.';
    }
    card.innerHTML = '<div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs leading-relaxed">' +
      '<b>⚠️ Lỗi:</b> ' + escapeHtml(msg) + hint + '</div>';
  })
  .then(function() {
    btn.disabled = false;
    btn.classList.remove('opacity-60');
    var btnSpan2 = btn.querySelector('span');
    if (btnSpan2) btnSpan2.innerText = 'AI gợi ý cho tôi';
  });
}

console.log('✅ ai/gemini-api.js loaded');