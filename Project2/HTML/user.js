function registerSession(user) {
  if (!firebase.db || user.isAnonymous) return;
  var sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
  var ref = firestoreSdk.doc(firebase.db, 'users', user.uid, 'sessions', sessionId);
  firestoreSdk.setDoc(ref, {
    userAgent: navigator.userAgent,
    createdAt: new Date().toISOString(),
    lastSeenAt: new Date().toISOString(),
    ip: 'client-side', // Không lấy được IP thật từ client
  });
  
  // Heartbeat mỗi 5 phút
  setInterval(function() {
    firestoreSdk.setDoc(ref, { lastSeenAt: new Date().toISOString() }, { merge: true });
  }, 5 * 60 * 1000);
}