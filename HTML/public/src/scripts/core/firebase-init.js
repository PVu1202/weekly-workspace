// ═══════════════════════════════════════════════════════════════
// FIREBASE INIT — Load SDK + App Check + Auth listener
// ═══════════════════════════════════════════════════════════════

(async function() {
  try {
    console.log('🔄 Đang tải Firebase SDK...');

    var appMod  = await import("https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js");
    var authMod = await import("https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js");
    var fsMod   = await import("https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js");
    var aiMod   = await import("https://www.gstatic.com/firebasejs/11.8.0/firebase-ai.js");

    firestoreSdk.doc = fsMod.doc;
    firestoreSdk.setDoc = fsMod.setDoc;
    firestoreSdk.onSnapshot = fsMod.onSnapshot;

    var app = appMod.initializeApp(firebaseConfig);

    // ═══ APP CHECK với reCAPTCHA Enterprise ═══
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      console.log('🔧 App Check: chế độ DEBUG cho localhost');
    }

    try {
      var appCheckMod = await import("https://www.gstatic.com/firebasejs/11.8.0/firebase-app-check.js");
      var appCheckProvider = new appCheckMod.ReCaptchaEnterpriseProvider('6LemONEtAAAAAL2_NqqUPznijBV9MjGM9L4_Ot9d');
      appCheckMod.initializeAppCheck(app, {
        provider: appCheckProvider,
        isTokenAutoRefreshEnabled: true
      });
      console.log('✅ App Check đã khởi tạo');
    } catch (e) {
      console.warn('⚠️ App Check lỗi (app vẫn chạy):', e.message);
    }

    var auth = authMod.getAuth(app);
    var db = fsMod.getFirestore(app);

    firebase.app = app;
    firebase.auth = auth;
    firebase.db = db;
    firebase.signInEmail = authMod.signInWithEmailAndPassword;
    firebase.createUser = authMod.createUserWithEmailAndPassword;
    firebase.signInPopup = authMod.signInWithPopup;
    firebase.signInRedirect = authMod.signInWithRedirect;
    firebase.GoogleAuthProvider = authMod.GoogleAuthProvider;
    firebase.signInAnonymously = authMod.signInAnonymously;
    firebase.signOut = authMod.signOut;
    firebase.updateProfile = authMod.updateProfile;
    firebase.ready = true;

    console.log('✅ Firebase đã sẵn sàng');

    // Auth state listener
    authMod.onAuthStateChanged(auth, function(user) {
      if (user) {
        if (typeof activateUserSession === 'function') {
          activateUserSession({
            uid: user.uid,
            displayName: user.displayName || user.email || (user.isAnonymous ? 'Khách ẩn danh' : ''),
            email: user.email || (user.isAnonymous ? 'guest@anonymous.local' : ''),
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous
          });
        }
        hideOverlay();
      } else {
        firebase.user = null;
        if (firebase.unsub) { firebase.unsub(); firebase.unsub = null; }
        state.goals = [];
        state.reviews = {};
        if (typeof showAuthScreen === 'function') showAuthScreen();
        hideOverlay();
      }
    });

    // Redirect result
    try {
      var result = await authMod.getRedirectResult(auth);
      if (result && result.user && window.Swal) {
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          text: 'Xin chào ' + (result.user.displayName || result.user.email),
          timer: 1500,
          showConfirmButton: false,
          background: '#1a1b2e',
          color: '#fff'
        });
      }
    } catch(err) {
      console.warn('Redirect auth:', err);
    }

    // AI
    try {
      var firebaseAI = aiMod.getAI(app, { backend: new aiMod.GoogleAIBackend() });
      firebase.aiModel = aiMod.getGenerativeModel(firebaseAI, {
        model: "gemini-3.8-flash",
        systemInstruction: 'Bạn là AI Productivity Coach. Chỉ đưa ra gợi ý thực tế, ngắn gọn. Ưu tiên: task trễ, task quan trọng. Trả lời bằng tiếng Việt, tối đa 5 gợi ý.'
      });
      firebase.aiReady = true;
      console.log('✅ AI Coach sẵn sàng (gemini-3.8-flash)');
    } catch (aiError) {
      console.warn('⚠️ AI chưa sẵn sàng:', aiError);
    }

  } catch(e) {
    console.error('❌ Không tải được Firebase:', e);
    hideOverlay();
    if (window.Swal) {
      Swal.fire({
        icon: 'error',
        title: 'Không kết nối được Firebase',
        html: 'Kiểm tra:<br>1. Kết nối internet<br>2. Cấu hình Firebase<br>3. Firebase Console → Authentication đã bật<br><br><small class="text-gray-400">' + escapeHtml(e.message || '') + '</small>',
        background: '#1a1b2e',
        color: '#fff'
      });
    }
  }
})();

console.log('✅ firebase-init.js loaded');