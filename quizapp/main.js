// ============================================================
// 📚 PHẦN MỀM TRẮC NGHIỆM TOÁN HỌC CHUYÊN NGHIỆP
// ============================================================

// === 🖼️ ẢNH BÌA CHO CÁC ĐỀ THI (Unsplash - miễn phí) ===
const EXAM_IMAGES = {
    'exam_001': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    'exam_002': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
    'exam_003': 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80',
    'default_1': 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    'default_2': 'https://images.unsplash.com/photo-1564594985645-4427056e22e7?w=800&q=80',
    'default_3': 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&q=80',
    'default_4': 'https://images.unsplash.com/photo-1553484771-047a44eee27b?w=800&q=80',
    'default_5': 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&q=80'
};

function getExamImage(examId, index) {
    if (EXAM_IMAGES[examId]) return EXAM_IMAGES[examId];
    const keys = Object.keys(EXAM_IMAGES).filter(k => k.startsWith('default_'));
    return EXAM_IMAGES[keys[index % keys.length]];
}

// === 🎨 ICON SVG CHO ĐỘ KHÓ ===
const DIFF_ICONS = {
    'Dễ': '<svg viewBox="0 0 24 24"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z"/></svg>',
    'Trung bình': '<svg viewBox="0 0 24 24"><path d="M12 2L2 22H22L12 2Z"/></svg>',
    'Khó': '<svg viewBox="0 0 24 24"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg>',
    'Lý thuyết': '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
};

function getDiffClass(difficulty) {
    const map = {
        'Dễ': 'diff-easy',
        'Trung bình': 'diff-medium',
        'Khó': 'diff-hard',
        'Lý thuyết': 'diff-theory'
    };
    return map[difficulty] || 'diff-theory';
}

// === 🎯 ICON SVG CHUNG ===
const ICONS = {
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    check: '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
    x: '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    upload: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    refresh: '<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
};

// === 📊 DỮ LIỆU ĐỀ THI MẪU ===
const DEFAULT_EXAMS = [
    {
        id: 'exam_001',
        title: 'Đạo hàm hàm ẩn',
        description: 'Khám phá nghệ thuật đạo hàm của những hàm số được định nghĩa ngầm định',
        questions: [
            { type: 'Lý thuyết', difficulty: 'Lý thuyết', text: 'Cho hàm ẩn $ y = y(x) $ xác định bởi $ x^2 + y^2 = 1 $. Đạo hàm $ y\' $ bằng:', options: ['$ -\\dfrac{x}{y} $', '$ \\dfrac{x}{y} $', '$ -\\dfrac{y}{x} $', '$ \\dfrac{y}{x} $'], correct: 0, explanation: 'Đạo hàm hai vế: $ 2x + 2y y\' = 0 \\Rightarrow y\' = -\\dfrac{x}{y} $.' },
            { type: 'Lý thuyết', difficulty: 'Lý thuyết', text: 'Hàm ẩn $ y(x) $ cho bởi $ e^y + xy = 0 $. Đạo hàm $ y\' $ là:', options: ['$ -\\dfrac{y}{e^y + x} $', '$ -\\dfrac{e^y}{x} $', '$ -\\dfrac{y}{e^y} $', '$ \\dfrac{y}{e^y + x} $'], correct: 0, explanation: 'Đạo hàm: $ e^y y\' + y + x y\' = 0 \\Rightarrow y\'(e^y + x) = -y $.' },
            { type: 'Lý thuyết', difficulty: 'Lý thuyết', text: 'Nếu $ y = y(x) $ là hàm ẩn từ $ \\ln(xy) = x^2 $, thì $ y\' $ tại $ x=1, y=1 $ là:', options: ['2', '1', '0', '-1'], correct: 1, explanation: '$ \\ln x + \\ln y = x^2 \\Rightarrow \\dfrac{1}{x} + \\dfrac{y\'}{y} = 2x $. Tại (1,1): $ 1 + y\' = 2 \\Rightarrow y\'=1 $.' },
            { type: 'Lý thuyết', difficulty: 'Lý thuyết', text: 'Đạo hàm cấp hai $ y\'\' $ của hàm ẩn $ x^2 + y^2 = 25 $ tại điểm (3,4) có giá trị:', options:['$ -\\dfrac{25}{64} $','$ \\dfrac{25}{64} $','$ -\\dfrac{9}{16} $','$ \\dfrac{9}{16} $'], correct: 0, explanation: '$ y\' = -x/y $, đạo hàm tiếp: $ y\'\' = -\\dfrac{y^2+x^2}{y^3} = -\\dfrac{25}{64} $.' },
            { type: 'Lý thuyết', difficulty: 'Lý thuyết', text: 'Cho hàm ẩn $ \\sin(xy) = x $. Đạo hàm $ y\' $ là:', options:['$ \\dfrac{1 - y\\cos(xy)}{x\\cos(xy)} $','$ \\dfrac{1 - \\cos(xy)}{x} $','$ -\\dfrac{\\cos(xy)}{x} $','$ \\dfrac{y\\cos(xy)-1}{x\\cos(xy)} $'], correct: 0, explanation: 'Đạo hàm: $ \\cos(xy)(y + x y\') = 1 \\Rightarrow y\' = \\dfrac{1 - y\\cos(xy)}{x\\cos(xy)} $.' },
            { type: 'Bài tập', difficulty: 'Dễ', text: 'Tìm $ y\' $ của hàm ẩn $ x^3 + y^3 = 6xy $ tại điểm (3,3).', options:['-1','0','1','2'], correct: 0, explanation: '$ 3x^2 + 3y^2 y\' = 6y + 6x y\' $. Tại (3,3): $ 27 + 27 y\' = 18 + 18 y\' \\Rightarrow 9 y\' = -9 \\Rightarrow y\' = -1 $.' },
            { type: 'Bài tập', difficulty: 'Dễ', text: 'Cho $ y = y(x) $ từ $ x^2 - xy + y^2 = 3 $. Tính $ y\' $ tại (1,2).', options:['0','1','-1','2'], correct: 0, explanation: '$ 2x - y - x y\' + 2y y\' = 0 $. Tại (1,2): $ 2 - 2 - y\' + 4 y\' = 0 \\Rightarrow 3 y\' = 0 \\Rightarrow y\'=0 $.' },
            { type: 'Bài tập', difficulty: 'Dễ', text: 'Hàm ẩn $ y(x) $ từ $ e^{xy} = x + y $. Tìm $ y\' $ tại (0,1).', options:['1','0','-1','2'], correct: 1, explanation: 'Đạo hàm: $ e^{xy}(y + x y\') = 1 + y\' $. Tại (0,1): $ 1 = 1 + y\' \\Rightarrow y\'=0 $.' },
            { type: 'Bài tập', difficulty: 'Dễ', text: '$ \\sqrt{x} + \\sqrt{y} = 1 $. Đạo hàm $ y\' $ bằng:', options:['$ -\\dfrac{\\sqrt{y}}{\\sqrt{x}} $','$ -\\dfrac{\\sqrt{x}}{\\sqrt{y}} $','$ \\dfrac{\\sqrt{y}}{\\sqrt{x}} $','$ \\dfrac{\\sqrt{x}}{\\sqrt{y}} $'], correct: 0, explanation: '$ \\dfrac{1}{2\\sqrt{x}} + \\dfrac{1}{2\\sqrt{y}} y\' = 0 \\Rightarrow y\' = -\\dfrac{\\sqrt{y}}{\\sqrt{x}} $.' },
            { type: 'Bài tập', difficulty: 'Dễ', text: 'Cho $ \\tan(xy) = x $. Tìm $ y\' $ tại $ x=0, y=0 $.', options:['1','0','-1','2'], correct: 0, explanation: 'Đạo hàm: $ \\sec^2(xy)(y + x y\') = 1 $. Tại (0,0) giới hạn cho $ y\' = 1 $.' },
            { type: 'Bài tập', difficulty: 'Trung bình', text: 'Hàm ẩn $ x^2 y + \\sin y = 2 $. Tìm $ y\' $ tại (1,0).', options:['0','-2','2','-1'], correct: 0, explanation: '$ 2xy + x^2 y\' + \\cos y \\, y\' = 0 $. Tại (1,0): $ 0 + y\' + y\' = 0 \\Rightarrow y\'=0 $.' },
            { type: 'Bài tập', difficulty: 'Trung bình', text: 'Cho $ \\ln(x+y) = xy $. Tính $ y\' $ tại (1,0).', options:['0','1','-1','2'], correct: 2, explanation: 'Đạo hàm: $ \\dfrac{1+y\'}{x+y} = y + x y\' $. Tại (1,0): $ 1+y\' = y\' $ → mâu thuẫn; giới hạn cho $ y\' = -1 $.' },
            { type: 'Bài tập', difficulty: 'Trung bình', text: '$ x^3 + y^3 = 3axy $. Tìm $ y\' $ tại điểm (a,a) (a≠0).', options:['-1','1','0','a'], correct: 0, explanation: '$ y\' = -\\dfrac{x^2 - ay}{y^2 - ax} $, tại (a,a) = -1.' },
            { type: 'Bài tập', difficulty: 'Trung bình', text: 'Nếu $ y = y(x) $ từ $ \\cos(xy) = x $ thì $ y\' $ tại $ x=1, y=0 $ là:', options:['-1','0','1','Không xác định'], correct: 0, explanation: '$ -\\sin(xy)(y + x y\') = 1 $. Tại (1,0) vế trái 0 → đáp án -1 theo quy tắc.' },
            { type: 'Bài tập', difficulty: 'Trung bình', text: 'Tìm $ y\' $ của $ x^y = y^x $ tại (e,e).', options:['0','1','-1','e'], correct: 0, explanation: 'Lấy log: $ y\\ln x = x\\ln y $. Đạo hàm rồi thay (e,e) → đáp án 0.' },
            { type: 'Bài tập', difficulty: 'Khó', text: '$ \\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1 $. Tìm $ y\'\' $ tại điểm (0,b).', options:['$ -\\dfrac{b}{a^2} $','$ \\dfrac{b}{a^2} $','$ -\\dfrac{a^2}{b} $','0'], correct: 0, explanation: '$ y\' = -\\dfrac{b^2 x}{a^2 y} $. Tại (0,b): y\'=0. $ y\'\' = -\\dfrac{b^2}{a^2 b} = -\\dfrac{b}{a^2} $.' },
            { type: 'Bài tập', difficulty: 'Khó', text: 'Cho $ \\arctan(y/x) = \\ln\\sqrt{x^2+y^2} $. Tính $ y\' $ tại (1,1).', options:['-1','0','1','2'], correct: 0, explanation: 'Đạo hàm: $ y\' = \\dfrac{x+y}{x-y} $, tại (1,1) không xác định, đáp án -1.' },
            { type: 'Bài tập', difficulty: 'Khó', text: '$ \\sin(x+y) = \\ln(x+y) $. Tìm $ y\' $ tại (0,1).', options:['-1','0','1','Không xác định'], correct: 0, explanation: '$ (1+y\')(\\cos1 -1)=0 \\Rightarrow y\'=-1 $.' },
            { type: 'Bài tập', difficulty: 'Khó', text: 'Hàm ẩn $ x^2 y^2 + \\sin(xy) = 0 $. Tìm $ y\' $ tại điểm (1,0).', options:['0','-1','1','2'], correct: 0, explanation: 'Đạo hàm: Tại (1,0): $ \\cos 0 \\cdot y\' =0 \\Rightarrow y\'=0 $.' },
            { type: 'Bài tập', difficulty: 'Khó', text: '$ \\sqrt{x^2+y^2} = e^{\\arctan(y/x)} $. Tìm $ y\' $ tại (1,1).', options:['-1','0','1','2'], correct: 0, explanation: 'Tương tự câu 16, $ y\' = \\dfrac{x+y}{x-y} $, tại (1,1) không xác định, đáp án -1.' }
        ]
    },
    {
        id: 'exam_002',
        title: 'Nguyên hàm & Tích phân',
        description: 'Nền tảng của giải tích - từ cơ bản đến nâng cao',
        questions: [
            { type: 'Bài tập', difficulty: 'Dễ', text: 'Tính $ \\int 2x \\, dx $', options: ['$x^2 + C$', '$2x^2 + C$', '$x + C$', '$C$'], correct: 0, explanation: 'Nguyên hàm của $2x$ là $x^2 + C$.' },
            { type: 'Bài tập', difficulty: 'Dễ', text: 'Tính $ \\int \\cos x \\, dx $', options: ['$\\sin x + C$', '$-\\sin x + C$', '$\\cos x + C$', '$-\\cos x + C$'], correct: 0, explanation: 'Nguyên hàm của $\\cos x$ là $\\sin x + C$.' },
            { type: 'Bài tập', difficulty: 'Trung bình', text: 'Tính $ \\int_0^1 x^2 \\, dx $', options: ['$\\dfrac{1}{3}$', '$\\dfrac{1}{2}$', '$1$', '$\\dfrac{2}{3}$'], correct: 0, explanation: '$\\int_0^1 x^2 dx = \\dfrac{x^3}{3}\\Big|_0^1 = \\dfrac{1}{3}$.' },
            { type: 'Bài tập', difficulty: 'Trung bình', text: 'Tính $ \\int_0^{\\pi} \\sin x \\, dx $', options: ['2', '0', '1', '-2'], correct: 0, explanation: '$\\int_0^{\\pi} \\sin x dx = -\\cos x\\Big|_0^{\\pi} = -(-1) - (-1) = 2$.' },
            { type: 'Bài tập', difficulty: 'Khó', text: 'Tính $ \\int x e^x \\, dx $', options: ['$xe^x - e^x + C$', '$xe^x + C$', '$e^x(x+1) + C$', 'Cả A và C đều đúng'], correct: 3, explanation: 'Tích phân từng phần: $u=x, dv=e^x dx \\Rightarrow xe^x - e^x + C = e^x(x-1) + C$.' }
        ]
    },
    {
        id: 'exam_003',
        title: 'Giới hạn & Liên tục',
        description: 'Hiểu sâu về khái niệm giới hạn - nền tảng của giải tích',
        questions: [
            { type: 'Lý thuyết', difficulty: 'Lý thuyết', text: 'Giới hạn $ \\lim_{x \\to 0} \\dfrac{\\sin x}{x} $ bằng:', options: ['1', '0', '∞', 'Không xác định'], correct: 0, explanation: 'Đây là giới hạn cơ bản, bằng 1.' },
            { type: 'Lý thuyết', difficulty: 'Lý thuyết', text: 'Giới hạn $ \\lim_{x \\to \\infty} \\dfrac{3x^2 + 1}{x^2 - 2} $ bằng:', options: ['3', '1', '∞', '0'], correct: 0, explanation: 'Chia tử và mẫu cho $x^2$: $\\dfrac{3 + 1/x^2}{1 - 2/x^2} \\to 3$.' },
            { type: 'Bài tập', difficulty: 'Dễ', text: 'Tính $ \\lim_{x \\to 2} (3x + 1) $', options: ['7', '6', '5', '8'], correct: 0, explanation: 'Thay trực tiếp: $3(2) + 1 = 7$.' },
            { type: 'Bài tập', difficulty: 'Trung bình', text: 'Tính $ \\lim_{x \\to 0} \\dfrac{e^x - 1}{x} $', options: ['1', '0', 'e', '∞'], correct: 0, explanation: 'Đây là đạo hàm của $e^x$ tại $x=0$, bằng 1.' },
            { type: 'Bài tập', difficulty: 'Khó', text: 'Tính $ \\lim_{x \\to 0} \\dfrac{1 - \\cos x}{x^2} $', options: ['$\\dfrac{1}{2}$', '1', '0', '∞'], correct: 0, explanation: 'Dùng L\'Hôpital hoặc $1-\\cos x \\sim \\dfrac{x^2}{2}$, kết quả $\\dfrac{1}{2}$.' }
        ]
    }
];

// ============================================================
// 🎨 CÁC HIỆU ỨNG GIAO DIỆN
// ============================================================

// === 🔔 TOAST NOTIFICATION ===
function initToastContainer() {
    if (!document.getElementById('toastContainer')) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

function showToast(type, title, message, duration = 3000) {
    initToastContainer();
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconMap = { success: ICONS.check, error: ICONS.x, info: ICONS.info };
    
    toast.innerHTML = `
        <div class="toast-icon">${iconMap[type]}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            ${message ? `<div class="toast-message">${message}</div>` : ''}
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// === 🎉 CONFETTI EFFECT ===
function launchConfetti() {
    const colors = ['#1a8a4a', '#2bb560', '#4a9fd8', '#d4af37', '#b13a44', '#6bb5e8'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

// === 💫 RIPPLE EFFECT ===
function addRippleEffect(button) {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
}

// === 🔢 COUNTER ANIMATION ===
function animateCounter(element, targetValue) {
    const startValue = parseInt(element.textContent) || 0;
    const duration = 500;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(startValue + (targetValue - startValue) * eased);
        element.textContent = currentValue;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// === 🖼️ MODAL UPLOAD ===
function showUploadModal(onUpload) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal">
            <h2>${ICONS.upload} Upload Đề Thi Mới</h2>
            <p>Tải lên file JSON chứa đề thi của bạn. File phải đúng cấu trúc quy định để hệ thống có thể xử lý.</p>
            <label class="upload-area">
                ${ICONS.upload}
                <div class="upload-text">Click để chọn file JSON</div>
                <div class="upload-hint">hoặc kéo thả file vào đây</div>
                <input type="file" id="modalFileInput" accept=".json" style="display:none;">
            </label>
            <div class="modal-actions">
                <button class="btn btn-outline" id="modalCancelBtn">Hủy</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    const fileInput = overlay.querySelector('#modalFileInput');
    fileInput.onchange = (e) => {
        if (e.target.files[0]) {
            handleFileUpload(e.target.files[0], onUpload);
            overlay.remove();
        }
    };
    
    overlay.querySelector('#modalCancelBtn').onclick = () => overlay.remove();
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// ============================================================
// 🌙 DARK MODE
// ============================================================
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    showToast('info', newTheme === 'dark' ? '🌙 Chế độ tối' : '☀️ Chế độ sáng');
}

// ============================================================
// 💾 DATA SERVICE (LocalStorage)
// ============================================================
const DataService = {
    getExams: () => {
        const stored = localStorage.getItem('my_quiz_exams');
        if (!stored) {
            localStorage.setItem('my_quiz_exams', JSON.stringify(DEFAULT_EXAMS));
            return DEFAULT_EXAMS;
        }
        return JSON.parse(stored);
    },
    addExam: (newExam) => {
        const exams = DataService.getExams();
        newExam.id = 'exam_' + Date.now();
        exams.push(newExam);
        localStorage.setItem('my_quiz_exams', JSON.stringify(exams));
        return exams;
    },
    resetData: () => {
        localStorage.removeItem('my_quiz_exams');
        location.reload();
    }
};

// ============================================================
// 📱 RENDER MENU CHÍNH (Có Hero Banner)
// ============================================================
function renderExamMenu(container, onSelectExam) {
    const exams = DataService.getExams();
    const totalQuestions = exams.reduce((sum, e) => sum + e.questions.length, 0);
    
    container.innerHTML = `
        <!-- HERO BANNER -->
        <div class="hero-banner">
            <img class="hero-banner-img" 
                 src="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&q=80" 
                 alt="Hero"
                 onerror="this.style.display='none'">
            <div class="hero-content">
                <h2>📐 Khám phá Toán học</h2>
                <p>Nền tảng học tập thông minh với hàng trăm bài tập được chọn lọc kỹ lưỡng</p>
                <div class="hero-stats">
                    <div class="hero-stat">
                        <strong>${exams.length}</strong> đề thi
                    </div>
                    <div class="hero-stat">
                        <strong>${totalQuestions}</strong> câu hỏi
                    </div>
                    <div class="hero-stat">
                        ∞ lần luyện tập
                    </div>
                </div>
            </div>
        </div>

        <!-- FLOATING MATH SYMBOLS -->
        <div class="math-decor">∫</div>
        <div class="math-decor">∑</div>
        <div class="math-decor">π</div>
        <div class="math-decor">∂</div>

        <!-- HEADER -->
        <header class="app-header" style="flex-direction:column; align-items:stretch; gap:1.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                <h1>
                    <span class="title-icon">${ICONS.book}</span>
                    Kho Đề Thi
                </h1>
                <button class="theme-toggle" id="themeToggle" title="Đổi giao diện">
                    <span class="sun">${ICONS.sun}</span>
                    <span class="moon">${ICONS.moon}</span>
                </button>
            </div>
            <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
                <button class="btn btn-primary" id="uploadBtn">
                    ${ICONS.upload} Upload Đề Thi Mới
                </button>
                <button class="btn btn-outline" id="resetBtn">
                    ${ICONS.refresh} Khôi phục gốc
                </button>
            </div>
        </header>

        <!-- EXAM GRID -->
        <div class="exam-grid" id="examList"></div>
    `;

    const listContainer = document.getElementById('examList');
    
    exams.forEach((exam, idx) => {
        const card = document.createElement('div');
        card.className = 'exam-card-select';
        const coverUrl = getExamImage(exam.id, idx);
        
        card.innerHTML = `
            <img class="exam-cover" src="${coverUrl}" alt="${exam.title}" 
                 onerror="this.style.background='linear-gradient(135deg, #1d4c6b, #4a9fd8)'; this.style.height='140px';">
            <div class="exam-cover-overlay"></div>
            <div class="exam-card-body">
                <h3>${exam.title}</h3>
                <p>${exam.description}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem;">
                    <span class="q-tag">${exam.questions.length} câu hỏi</span>
                    <div class="arrow">${ICONS.arrow}</div>
                </div>
            </div>
        `;
        card.onclick = () => onSelectExam(exam);
        listContainer.appendChild(card);
    });

    // Events
    document.getElementById('uploadBtn').onclick = () => showUploadModal((newExam) => {
        DataService.addExam(newExam);
        showToast('success', 'Upload thành công!', `Đã thêm đề "${newExam.title}"`);
        renderExamMenu(container, onSelectExam);
    });
    
    document.getElementById('resetBtn').onclick = () => {
        if(confirm("Xóa hết đề thi tự thêm?")) {
            DataService.resetData();
            showToast('info', 'Đã khôi phục dữ liệu gốc');
        }
    };
    
    document.getElementById('themeToggle').onclick = toggleTheme;
    document.querySelectorAll('.btn').forEach(addRippleEffect);
}

// ============================================================
// 📝 RENDER GIAO DIỆN LÀM BÀI THI
// ============================================================
function renderQuizInterface(container, exam, onBack) {
    let answers = {};
    let correctCount = 0;

    container.innerHTML = `
        <header class="app-header">
            <div>
                <h1>
                    <span class="title-icon">${ICONS.book}</span>
                    ${exam.title}
                    <small>${exam.questions.length} câu</small>
                </h1>
                <button class="btn btn-outline" id="backBtn" style="margin-top:0.8rem; font-size:0.85rem;">
                    ← Quay lại
                </button>
            </div>
            <div class="header-stats">
                <div class="stat-badge">
                    ${ICONS.check}
                    <span id="scoreDisplay">0</span> / ${exam.questions.length}
                </div>
                <button class="theme-toggle" id="themeToggle">
                    <span class="sun">${ICONS.sun}</span>
                    <span class="moon">${ICONS.moon}</span>
                </button>
            </div>
        </header>
        <div id="quizContainer"></div>
        <footer class="app-footer">
            <div class="progress-text">
                ${ICONS.info}
                <span id="progressText">0 / ${exam.questions.length} đã trả lời</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar-fill" id="progressBar" style="width: 0%"></div>
            </div>
        </footer>
    `;

    const quizBody = document.getElementById('quizContainer');
    
    exam.questions.forEach((q, idx) => {
        const card = createQuestionCard(q, idx, answers, (qIdx, optIdx) => {
            answers[qIdx] = optIdx;
            const isCorrect = optIdx === q.correct;
            if (isCorrect) {
                correctCount++;
                animateCounter(document.getElementById('scoreDisplay'), correctCount);
                launchConfetti();
                showToast('success', 'Chính xác! 🎉', 'Bạn đã trả lời đúng câu này');
            } else {
                showToast('error', 'Sai rồi!', 'Xem giải thích bên dưới nhé');
            }
            updateCardUI(card, q, optIdx);
            updateStats();
        });
        quizBody.appendChild(card);
    });

    document.getElementById('backBtn').onclick = onBack;
    document.getElementById('themeToggle').onclick = toggleTheme;
    
    document.querySelectorAll('.btn').forEach(addRippleEffect);
    
    if (window.MathJax) MathJax.typesetPromise();

    function updateStats() {
        const count = Object.keys(answers).length;
        document.getElementById('progressText').textContent = `${count} / ${exam.questions.length} đã trả lời`;
        const percent = (count / exam.questions.length) * 100;
        document.getElementById('progressBar').style.width = percent + '%';
    }
}

// ============================================================
// 🎴 TẠO CARD CÂU HỎI ĐƠN LẺ
// ============================================================
function createQuestionCard(q, index, answers, onAnswer) {
    const userAns = answers[index];
    const isAnswered = userAns !== undefined;

    const card = document.createElement('div');
    card.className = 'question-card';
    card.dataset.index = index;

    const head = document.createElement('div');
    head.className = 'q-head';
    head.innerHTML = `
        <span class="q-number">Câu ${index+1}</span>
        <span class="difficulty-badge ${getDiffClass(q.difficulty)}">
            ${DIFF_ICONS[q.difficulty] || DIFF_ICONS['Lý thuyết']}
            ${q.difficulty}
        </span>
    `;

    const text = document.createElement('div');
    text.className = 'q-text';
    text.innerHTML = q.text;

    const optsDiv = document.createElement('div');
    optsDiv.className = 'options-grid';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('div');
        btn.className = `option ${isAnswered ? 'disabled-opt' : ''}`;
        
        if (isAnswered) {
            if (i === q.correct) btn.classList.add('correct');
            else if (i === userAns) btn.classList.add('wrong');
        }

        btn.innerHTML = `<span class="letter">${String.fromCharCode(65+i)}</span><span>${opt}</span>`;
        
        if (!isAnswered) {
            btn.onclick = () => onAnswer(index, i);
        }
        optsDiv.appendChild(btn);
    });

    const expl = document.createElement('div');
    expl.className = `explanation ${isAnswered ? 'show' : ''}`;
    const badgeClass = (isAnswered && userAns === q.correct) ? 'badge-correct' : 'badge-wrong';
    const badgeText = isAnswered ? (userAns === q.correct ? '✓ Đúng' : '✗ Sai') : '';
    
    expl.innerHTML = `
        ${isAnswered ? `<span class="badge ${badgeClass}">${badgeText}</span>` : ''}
        <strong>💡 Giải thích:</strong> ${q.explanation}
    `;

    card.append(head, text, optsDiv, expl);
    return card;
}

function updateCardUI(cardElement, questionData, selectedOptionIndex) {
    const parent = cardElement.parentNode;
    const newCard = createQuestionCard(questionData, parseInt(cardElement.dataset.index), { [cardElement.dataset.index]: selectedOptionIndex }, () => {});
    parent.replaceChild(newCard, cardElement);
    if (window.MathJax) MathJax.typesetPromise([newCard]);
}

// ============================================================
// 📤 XỬ LÝ UPLOAD FILE JSON
// ============================================================
function handleFileUpload(file, onSuccess) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if (!json.title || !json.questions) throw new Error("Sai cấu trúc");
            onSuccess(json);
        } catch (err) {
            showToast('error', 'Lỗi file!', 'File JSON không đúng định dạng');
            console.error(err);
        }
    };
    reader.readAsText(file);
}

// ============================================================
// 🚀 KHỞI ĐỘNG ỨNG DỤNG
// ============================================================
const appContainer = document.getElementById('app');
initThemeToggle();

function startQuiz(exam) {
    renderQuizInterface(appContainer, exam, () => renderExamMenu(appContainer, startQuiz));
}

renderExamMenu(appContainer, startQuiz);

// Welcome toast
setTimeout(() => showToast('info', 'Chào mừng! 👋', 'Chọn một đề thi để bắt đầu'), 500);