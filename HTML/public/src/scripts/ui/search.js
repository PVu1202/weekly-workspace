// ═══════════════════════════════════════════════════════════════
// SEARCH — Tìm task + Highlight kết quả
// ═══════════════════════════════════════════════════════════════

var searchDebounceTimer = null;

function handleSearchInput(e) {
  var value = e.target.value.trim();

  var clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) {
    clearBtn.classList.toggle('hidden', value === '');
  }

  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(function() {
    state.searchQuery = value.toLowerCase();
    renderAll();
    highlightSearchResults();
  }, 300);
}

function clearSearch() {
  var input = document.getElementById('globalSearchInput');
  var clearBtn = document.getElementById('clearSearchBtn');
  if (input) input.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');
  state.searchQuery = '';
  renderAll();
  if (input) input.focus();
}

function highlightSearchResults() {
  if (!state.searchQuery) return;
  var query = state.searchQuery;

  document.querySelectorAll('.daily-goal-title, .week-selected-task-title').forEach(function(el) {
    var original = el.getAttribute('data-original-text') || el.textContent;
    el.setAttribute('data-original-text', original);

    if (original.toLowerCase().includes(query)) {
      var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      el.innerHTML = original.replace(regex, '<mark class="bg-yellow-400/30 text-yellow-200 rounded px-0.5">$1</mark>');
    } else {
      el.innerHTML = original;
    }
  });
}

// Keyboard shortcut — Ctrl+K focus search, ESC clear
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    var input = document.getElementById('globalSearchInput');
    if (input) {
      input.focus();
      input.select();
    }
  }
  if (e.key === 'Escape') {
    var input = document.getElementById('globalSearchInput');
    if (input && document.activeElement === input) {
      clearSearch();
      input.blur();
    }
  }
});

console.log('✅ ui/search.js loaded');