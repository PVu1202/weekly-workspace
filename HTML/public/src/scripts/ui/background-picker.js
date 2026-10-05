// ═══════════════════════════════════════════════════════════════
// BACKGROUND PICKER — Đổi nền + Custom upload/URL
// ═══════════════════════════════════════════════════════════════

var BACKGROUNDS = [
  {
    id: 'bg-default',
    label: 'Aurora mặc định',
    preview: 'linear-gradient(135deg, #08080c 0%, #1a0b30 50%, #0a1420 100%)'
  },
  {
    id: 'bg-ocean',
    label: 'Đại dương',
    preview: 'linear-gradient(135deg, #051428 0%, #0a3860 50%, #062840 100%)'
  },
  {
    id: 'bg-sunset',
    label: 'Hoàng hôn',
    preview: 'linear-gradient(135deg, #1a0a1f 0%, #7a1a3a 50%, #d97706 100%)'
  },
  {
    id: 'bg-forest',
    label: 'Rừng xanh',
    preview: 'linear-gradient(135deg, #071a0f 0%, #0d4d2a 50%, #14b8a6 100%)'
  },
  {
    id: 'bg-midnight',
    label: 'Nửa đêm',
    preview: 'linear-gradient(135deg, #0d0520 0%, #3b0764 50%, #6d28d9 100%)'
  },
  {
    id: 'bg-aurora',
    label: 'Cực quang',
    preview: 'linear-gradient(135deg, #030a14 0%, #34d399 35%, #8b5cf6 65%, #22d3ee 100%)'
  },
  {
    id: 'bg-cyberpunk',
    label: 'Cyberpunk',
    preview: 'linear-gradient(135deg, #0a0014 0%, #ec4899 50%, #22d3ee 100%)'
  },
  {
    id: 'bg-minimal',
    label: 'Đen thuần',
    preview: 'linear-gradient(135deg, #000 0%, #0a0a0a 100%)'
  }
];

var _customBgData = null;
var _bgInitDone = false;

// ═══════════════════════════════════════════════════════════════
// CUSTOM BG — DOM APPLY
// ═══════════════════════════════════════════════════════════════

function applyCustomBgToDOM(data) {
  if (!data || !data.url) return;
  
  document.body.style.setProperty('background-image', 'url("' + data.url + '")', 'important');
  document.body.style.setProperty('background-size', 'cover', 'important');
  document.body.style.setProperty('background-position', 'center', 'important');
  document.body.style.setProperty('background-attachment', 'fixed', 'important');
  document.body.style.setProperty('background-repeat', 'no-repeat', 'important');
  document.body.style.setProperty('--custom-overlay', data.overlay || 0.65);
  
  document.documentElement.style.setProperty('background-image', 'url("' + data.url + '")', 'important');
  document.documentElement.style.setProperty('background-size', 'cover', 'important');
  document.documentElement.style.setProperty('background-position', 'center', 'important');
  document.documentElement.style.setProperty('background-attachment', 'fixed', 'important');
  document.documentElement.style.setProperty('background-repeat', 'no-repeat', 'important');
}

function clearCustomBgFromDOM() {
  var props = ['background-image', 'background-size', 'background-position', 'background-attachment', 'background-repeat'];
  props.forEach(function(p) {
    document.body.style.removeProperty(p);
    document.documentElement.style.removeProperty(p);
  });
  document.body.style.removeProperty('--custom-overlay');
  
  var earlyStyle = document.getElementById('early-bg-style');
  if (earlyStyle) earlyStyle.remove();
}

// ═══════════════════════════════════════════════════════════════
// CUSTOM BG — STORAGE
// ═══════════════════════════════════════════════════════════════

function loadCustomBg() {
  try {
    var saved = localStorage.getItem('ws_custom_bg');
    if (saved) {
      _customBgData = JSON.parse(saved);
    }
  } catch(e) { 
    console.warn('Load custom bg failed:', e); 
    _customBgData = null;
  }
  return _customBgData;
}

function saveCustomBg(data) {
  _customBgData = data;
  try {
    localStorage.setItem('ws_custom_bg', JSON.stringify(data));
    if (data && data.url) {
      localStorage.setItem('ws_custom_url', data.url);
      localStorage.setItem('ws_custom_overlay', String(data.overlay || 0.65));
    }
    return true;
  } catch(e) { 
    console.warn('Save custom bg failed:', e);
    if (typeof showTaskToast === 'function') {
      showTaskToast('⚠️ Không lưu được', 'Ảnh quá lớn, chọn ảnh nhỏ hơn');
    }
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════
// APPLY BACKGROUND (PRESET)
// ═══════════════════════════════════════════════════════════════

function applyBackground(bgId, options) {
  options = options || {};
  var save = options.save === true;

  var allBgIds = BACKGROUNDS.map(function(b) { return b.id; });
  if (!bgId || allBgIds.indexOf(bgId) < 0) bgId = 'bg-default';

  // Nếu không đổi → return sớm
  var currentBg = localStorage.getItem('ws_background') || 'bg-default';
  if (currentBg === bgId && !document.body.classList.contains('bg-custom')) {
    // Vẫn ensure class đúng
    allBgIds.forEach(function(id) {
      document.body.classList.remove(id);
      document.documentElement.classList.remove(id);
    });
    document.body.classList.add(bgId);
    document.documentElement.classList.add(bgId);
    return bgId;
  }

  // Xóa custom bg nếu đang bật
  if (document.body.classList.contains('bg-custom')) {
    document.body.classList.remove('bg-custom');
    document.documentElement.classList.remove('bg-custom');
    clearCustomBgFromDOM();
    try {
      localStorage.removeItem('ws_custom_url');
      localStorage.removeItem('ws_custom_overlay');
    } catch(e) {}
  }

  // Xóa tất cả class bg-* cũ
  allBgIds.forEach(function(id) {
    document.body.classList.remove(id);
    document.documentElement.classList.remove(id);
  });

  // Thêm class mới
  document.body.classList.add(bgId);
  document.documentElement.classList.add(bgId);

  // Lưu state
  if (!state.preferences) state.preferences = {};
  state.preferences.background = bgId;
  try { 
    localStorage.setItem('ws_background', bgId);
    localStorage.removeItem('ws_custom_bg');
    localStorage.removeItem('ws_custom_url');
    localStorage.removeItem('ws_custom_overlay');
  } catch(e) {}

  if (save && typeof saveStateToFirestore === 'function') {
    saveStateToFirestore();
  }

  return bgId;
}

// ═══════════════════════════════════════════════════════════════
// GET CURRENT
// ═══════════════════════════════════════════════════════════════

function getCurrentBackground() {
  return localStorage.getItem('ws_background') 
    || (state.preferences && state.preferences.background)
    || 'bg-default';
}

// ═══════════════════════════════════════════════════════════════
// OPEN PICKER MODAL
// ═══════════════════════════════════════════════════════════════

function openBackgroundPicker() {
   setTimeout(function() {
    _openBackgroundPickerNow();
  }, 50);
}

function _openBackgroundPickerNow() {
  var currentBg = getCurrentBackground();

  var presetItemsHtml = BACKGROUNDS.map(function(bg) {
    var isActive = bg.id === currentBg;
    return '<button type="button" ' +
              'class="bg-picker-item' + (isActive ? ' active' : '') + '" ' +
              'data-bg-id="' + bg.id + '" ' +
              'onclick="ww.pickBackground(\'' + bg.id + '\')">' +
              '<div class="bg-picker-preview" style="background:' + bg.preview + '"></div>' +
              '<div class="bg-picker-label">' + bg.label + '</div>' +
            '</button>';
  }).join('');

  Swal.fire({
    title: '',
    html:
      '<div style="text-align:left">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">' +
          '<div style="width:36px;height:36px;border-radius:10px;' +
              'background:linear-gradient(135deg,#7c5dfa,#22d3ee);' +
              'display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px">' +
            '<i class="fa-solid fa-image"></i>' +
          '</div>' +
          '<div>' +
            '<div style="font-size:16px;font-weight:800;color:#fff;letter-spacing:-0.02em">Đổi nền trang</div>' +
            '<div style="font-size:10px;color:#7d7d8a;margin-top:1px">Chọn nền có sẵn hoặc tự thêm ảnh của bạn</div>' +
          '</div>' +
        '</div>' +
        '<div class="bg-picker-tabs">' +
          '<button type="button" id="bgTabPreset" class="bg-picker-tab active" onclick="ww.switchBgTab(\'preset\')">' +
            '<i class="fa-solid fa-palette"></i> Có sẵn' +
          '</button>' +
          '<button type="button" id="bgTabCustom" class="bg-picker-tab" onclick="ww.switchBgTab(\'custom\')">' +
            '<i class="fa-solid fa-wand-magic-sparkles"></i> Tùy chỉnh' +
          '</button>' +
        '</div>' +
        '<div id="bgPresetPanel">' +
          '<div class="bg-picker-grid">' + presetItemsHtml + '</div>' +
        '</div>' +
        '<div id="bgCustomPanel" class="bg-custom-panel">' +
          '<div class="bg-upload-zone" id="bgUploadZone" onclick="document.getElementById(\'bgFileInput\').click()">' +
            '<i class="fa-solid fa-cloud-arrow-up bg-upload-icon"></i>' +
            '<div class="bg-upload-text">Click hoặc kéo ảnh vào đây</div>' +
            '<div class="bg-upload-hint">JPG, PNG, WEBP · Tối đa 10MB</div>' +
          '</div>' +
          '<input type="file" id="bgFileInput" accept="image/*" style="display:none">' +
          '<div class="bg-or-divider">hoặc</div>' +
          '<input type="url" id="bgUrlInput" class="bg-url-input" ' +
            'placeholder="Dán URL ảnh (https://...)" ' +
            'onkeydown="if(event.key===\'Enter\'){event.preventDefault();ww.useBgUrl();}">' +
          '<button type="button" class="bg-btn bg-btn-secondary" onclick="ww.useBgUrl()" style="margin-bottom:12px">' +
            '<i class="fa-solid fa-link"></i> Dùng URL này' +
          '</button>' +
          '<div class="bg-preview-box" id="bgPreviewBox">' +
            '<img id="bgPreviewImg" src="" alt="Preview">' +
            '<div class="bg-preview-overlay" id="bgPreviewOverlay"></div>' +
            '<div class="bg-preview-label">Preview</div>' +
          '</div>' +
          '<div class="bg-overlay-control">' +
            '<div class="bg-overlay-label">' +
              '<span>Độ tối overlay</span>' +
              '<span class="bg-overlay-value" id="bgOverlayValue">65%</span>' +
            '</div>' +
            '<input type="range" id="bgOverlaySlider" class="bg-overlay-slider" ' +
              'min="0" max="0.9" step="0.05" value="0.65">' +
          '</div>' +
          '<div class="bg-custom-actions">' +
            '<button type="button" class="bg-btn bg-btn-secondary" onclick="ww.resetBgCustom()">' +
              '<i class="fa-solid fa-rotate-left"></i> Đặt lại' +
            '</button>' +
            '<button type="button" class="bg-btn bg-btn-primary" onclick="ww.applyCustomBg()">' +
              '<i class="fa-solid fa-check"></i> Áp dụng' +
            '</button>' +
          '</div>' +
          (currentBg === 'bg-custom' 
            ? '<button type="button" class="bg-remove-btn" onclick="ww.removeCustomBg()">' +
                '<i class="fa-solid fa-trash-can"></i> Xóa nền tùy chỉnh' +
              '</button>'
            : '') +
        '</div>' +
      '</div>',
      
    showConfirmButton: false,
    showCloseButton: true,
    background: '#1a1b2e',
    color: '#fff',
    width: 500,
    allowOutsideClick: true,
    allowEscapeKey: true,
    didOpen: function() {
      // File input
      var fileInput = document.getElementById('bgFileInput');
      if (fileInput) {
        fileInput.addEventListener('change', function(e) {
          if (e.target.files && e.target.files[0]) {
            handleBgFileUpload(e.target.files[0]);
          }
        });
      }
      
      // Drag & drop
      var uploadZone = document.getElementById('bgUploadZone');
      if (uploadZone) {
        ['dragenter', 'dragover'].forEach(function(evt) {
          uploadZone.addEventListener(evt, function(e) {
            e.preventDefault();
            uploadZone.classList.add('dragover');
          });
        });
        ['dragleave', 'drop'].forEach(function(evt) {
          uploadZone.addEventListener(evt, function(e) {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
          });
        });
        uploadZone.addEventListener('drop', function(e) {
          var files = e.dataTransfer.files;
          if (files && files[0]) handleBgFileUpload(files[0]);
        });
      }
      
      // Slider
      var slider = document.getElementById('bgOverlaySlider');
      var sliderVal = document.getElementById('bgOverlayValue');
      var previewOverlay = document.getElementById('bgPreviewOverlay');
      if (slider && sliderVal) {
        slider.addEventListener('input', function() {
          var val = parseFloat(slider.value);
          sliderVal.textContent = Math.round(val * 100) + '%';
          if (previewOverlay) previewOverlay.style.setProperty('--preview-overlay', val);
        });
      }
      
      // Load custom if exists
      loadCustomBg();
      if (_customBgData && _customBgData.url) {
        var urlInput = document.getElementById('bgUrlInput');
        var overlaySlider = document.getElementById('bgOverlaySlider');
        if (urlInput && _customBgData.source === 'url') urlInput.value = _customBgData.url;
        if (overlaySlider) overlaySlider.value = _customBgData.overlay || 0.65;
        updateCustomPreview(_customBgData.url);
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// PICK PRESET BACKGROUND
// ═══════════════════════════════════════════════════════════════

function pickBackground(bgId) {
  applyBackground(bgId, { save: true });

  var allItems = document.querySelectorAll('.bg-picker-item');
  allItems.forEach(function(el) {
    if (el.getAttribute('data-bg-id') === bgId) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  var bg = BACKGROUNDS.find(function(b) { return b.id === bgId; });
  if (typeof showTaskToast === 'function' && bg) {
    showTaskToast('🎨 Đã đổi nền', bg.label);
  }
}

// ═══════════════════════════════════════════════════════════════
// SWITCH TAB
// ═══════════════════════════════════════════════════════════════

function switchBgTab(tab) {
  var presetTab = document.getElementById('bgPresetPanel');
  var customTab = document.getElementById('bgCustomPanel');
  var presetBtn = document.getElementById('bgTabPreset');
  var customBtn = document.getElementById('bgTabCustom');
  
  if (tab === 'preset') {
    presetTab.style.display = 'block';
    customTab.classList.remove('active');
    presetBtn.classList.add('active');
    customBtn.classList.remove('active');
  } else {
    presetTab.style.display = 'none';
    customTab.classList.add('active');
    presetBtn.classList.remove('active');
    customBtn.classList.add('active');
    
    loadCustomBg();
    if (_customBgData && _customBgData.url) {
      updateCustomPreview(_customBgData.url);
      var slider = document.getElementById('bgOverlaySlider');
      if (slider) slider.value = _customBgData.overlay || 0.65;
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// COMPRESS IMAGE
// ═══════════════════════════════════════════════════════════════

function compressImage(file, maxWidth, quality) {
  return new Promise(function(resolve, reject) {
    var fileKB = file.size / 1024;
    
    if (fileKB > 5000) {
      maxWidth = maxWidth || 1920;
      quality = quality || 0.55;
    } else if (fileKB > 2000) {
      maxWidth = maxWidth || 1920;
      quality = quality || 0.65;
    } else {
      maxWidth = maxWidth || 1920;
      quality = quality || 0.75;
    }
    
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var width = img.width;
        var height = img.height;
        
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        var dataUrl = canvas.toDataURL('image/jpeg', quality);
        var sizeKB = (dataUrl.length * 0.75) / 1024;
        
        if (sizeKB > 1500 && quality > 0.4) {
          dataUrl = canvas.toDataURL('image/jpeg', 0.4);
        }
        
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ═══════════════════════════════════════════════════════════════
// FILE UPLOAD
// ═══════════════════════════════════════════════════════════════

function handleBgFileUpload(file) {
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    Swal.fire({ icon: 'error', title: 'File không hợp lệ', text: 'Chỉ nhận file ảnh', background: '#1a1b2e', color: '#fff' });
    return;
  }
  
  if (file.size > 10 * 1024 * 1024) {
    Swal.fire({ icon: 'error', title: 'Ảnh quá lớn', text: 'Ảnh phải nhỏ hơn 10MB', background: '#1a1b2e', color: '#fff' });
    return;
  }
  
  if (typeof showTaskToast === 'function') {
    showTaskToast('📷 Đang xử lý ảnh...', 'Vui lòng đợi');
  }
  
  compressImage(file).then(function(dataUrl) {
    updateCustomPreview(dataUrl);
    _customBgData = { url: dataUrl, overlay: 0.65, source: 'upload' };
    if (typeof showTaskToast === 'function') {
      showTaskToast('✅ Đã nạp ảnh', 'Bấm "Áp dụng" để đặt làm nền');
    }
  }).catch(function(err) {
    console.error('Compress error:', err);
    Swal.fire({ icon: 'error', title: 'Lỗi', text: 'Không xử lý được ảnh', background: '#1a1b2e', color: '#fff' });
  });
}

// ═══════════════════════════════════════════════════════════════
// UPDATE PREVIEW
// ═══════════════════════════════════════════════════════════════

function updateCustomPreview(url) {
  var previewBox = document.getElementById('bgPreviewBox');
  var previewImg = document.getElementById('bgPreviewImg');
  var previewOverlay = document.getElementById('bgPreviewOverlay');
  var overlayValue = document.getElementById('bgOverlayValue');
  var slider = document.getElementById('bgOverlaySlider');
  
  if (!previewBox || !previewImg) return;
  
  if (url) {
    previewImg.src = url;
    previewBox.classList.add('active');
    
    var overlay = (_customBgData && _customBgData.overlay) || 
                  (slider ? parseFloat(slider.value) : 0.65);
    
    if (previewOverlay) previewOverlay.style.setProperty('--preview-overlay', overlay);
    if (overlayValue) overlayValue.textContent = Math.round(overlay * 100) + '%';
  } else {
    previewBox.classList.remove('active');
    previewImg.src = '';
  }
}

// ═══════════════════════════════════════════════════════════════
// USE URL
// ═══════════════════════════════════════════════════════════════

function useBgUrl() {
  var input = document.getElementById('bgUrlInput');
  if (!input) return;
  var url = input.value.trim();
  
  if (!url) {
    Swal.fire({ icon: 'warning', title: 'Chưa có URL', text: 'Vui lòng nhập URL ảnh', background: '#1a1b2e', color: '#fff' });
    return;
  }
  
  if (!/^https?:\/\//i.test(url)) {
    Swal.fire({ icon: 'error', title: 'URL không hợp lệ', text: 'URL phải bắt đầu bằng http:// hoặc https://', background: '#1a1b2e', color: '#fff' });
    return;
  }
  
  var testImg = new Image();
  testImg.onload = function() {
    _customBgData = { url: url, overlay: 0.65, source: 'url' };
    updateCustomPreview(url);
    if (typeof showTaskToast === 'function') {
      showTaskToast('✅ URL hợp lệ', 'Bấm "Áp dụng" để đặt làm nền');
    }
  };
  testImg.onerror = function() {
    Swal.fire({ icon: 'error', title: 'Không tải được ảnh', text: 'URL có thể bị chặn hoặc ảnh không tồn tại', background: '#1a1b2e', color: '#fff' });
  };
  testImg.src = url;
}

// ═══════════════════════════════════════════════════════════════
// APPLY CUSTOM BG
// ═══════════════════════════════════════════════════════════════

function applyCustomBg() {
  if (!_customBgData || !_customBgData.url) {
    Swal.fire({ icon: 'warning', title: 'Chưa có ảnh', text: 'Vui lòng chọn ảnh hoặc nhập URL trước', background: '#1a1b2e', color: '#fff' });
    return;
  }
  
  var slider = document.getElementById('bgOverlaySlider');
  if (slider) _customBgData.overlay = parseFloat(slider.value);
  
  if (!saveCustomBg(_customBgData)) return;
  
  try {
    localStorage.setItem('ws_background', 'bg-custom');
    localStorage.setItem('ws_custom_overlay', String(_customBgData.overlay));
  } catch(e) {}
  
  // Xóa preset bg
  BACKGROUNDS.forEach(function(b) {
    document.body.classList.remove(b.id);
    document.documentElement.classList.remove(b.id);
  });
  
  document.body.classList.add('bg-custom');
  document.documentElement.classList.add('bg-custom');
  applyCustomBgToDOM(_customBgData);
  
  if (!state.preferences) state.preferences = {};
  state.preferences.background = 'bg-custom';
  state.preferences.customOverlay = _customBgData.overlay;
  
  if (typeof saveStateToFirestore === 'function') saveStateToFirestore();
  if (typeof showTaskToast === 'function') {
    showTaskToast('🎨 Đã áp dụng nền', 'Nền tùy chỉnh đã kích hoạt');
  }
}

// ═══════════════════════════════════════════════════════════════
// REMOVE CUSTOM BG
// ═══════════════════════════════════════════════════════════════

function removeCustomBg() {
  Swal.fire({
    icon: 'warning',
    title: 'Xóa nền tùy chỉnh?',
    text: 'Nền sẽ trở về mặc định',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#374151',
    background: '#1a1b2e',
    color: '#fff'
  }).then(function(result) {
    if (!result.isConfirmed) return;
    
    try {
      localStorage.removeItem('ws_custom_bg');
      localStorage.removeItem('ws_custom_url');
      localStorage.removeItem('ws_custom_overlay');
    } catch(e) {}
    
    _customBgData = null;
    clearCustomBgFromDOM();
    document.body.classList.remove('bg-custom');
    document.documentElement.classList.remove('bg-custom');
    
    applyBackground('bg-default', { save: true });
    
    Swal.close();
    
    if (typeof showTaskToast === 'function') {
      showTaskToast('🗑️ Đã xóa nền', 'Về nền mặc định');
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// RESET FORM
// ═══════════════════════════════════════════════════════════════

function resetBgCustom() {
  _customBgData = null;
  var urlInput = document.getElementById('bgUrlInput');
  var fileInput = document.getElementById('bgFileInput');
  var slider = document.getElementById('bgOverlaySlider');
  var sliderVal = document.getElementById('bgOverlayValue');
  
  if (urlInput) urlInput.value = '';
  if (fileInput) fileInput.value = '';
  if (slider) slider.value = 0.65;
  if (sliderVal) sliderVal.textContent = '65%';
  updateCustomPreview(null);
}

// ═══════════════════════════════════════════════════════════════
// INIT BACKGROUND — Chạy 1 lần khi load
// ═══════════════════════════════════════════════════════════════

function initBackground() {
  var savedBg = localStorage.getItem('ws_background') || 'bg-default';
  
  if (savedBg === 'bg-custom') {
    loadCustomBg();
    
    if (_customBgData && _customBgData.url) {
      BACKGROUNDS.forEach(function(b) {
        document.body.classList.remove(b.id);
        document.documentElement.classList.remove(b.id);
      });
      document.body.classList.add('bg-custom');
      document.documentElement.classList.add('bg-custom');
      applyCustomBgToDOM(_customBgData);
      console.log('🎨 Custom bg loaded');
    } else {
      savedBg = 'bg-default';
      localStorage.setItem('ws_background', 'bg-default');
      applyBackground('bg-default');
      console.log('🎨 Custom bg missing → default');
    }
  } else {
    applyBackground(savedBg, { save: false });
    console.log('🎨 Preset bg loaded:', savedBg);
  }
}

function resetBackgroundInit() {
  _bgInitDone = false;
}



// ═══════════════════════════════════════════════════════════════
// EXPOSE
// ═══════════════════════════════════════════════════════════════

window.ww = window.ww || {};
window.ww.openBackgroundPicker = openBackgroundPicker;
window.ww.pickBackground = pickBackground;
window.ww.applyBackground = applyBackground;
window.ww.getCurrentBackground = getCurrentBackground;
window.ww.initBackground = initBackground;
window.ww.resetBackgroundInit = resetBackgroundInit;
window.ww.switchBgTab = switchBgTab;
window.ww.useBgUrl = useBgUrl;
window.ww.applyCustomBg = applyCustomBg;
window.ww.removeCustomBg = removeCustomBg;
window.ww.resetBgCustom = resetBgCustom;

console.log('✅ ui/background-picker.js loaded');