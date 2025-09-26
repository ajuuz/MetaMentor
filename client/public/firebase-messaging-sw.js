 
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCviBtnNdvrVp30yhIVKytdDzqQ3Ed_x50",
  authDomain: "meta-mentor.firebaseapp.com",
  projectId: "meta-mentor",
  storageBucket: "meta-mentor.firebasestorage.app",
  messagingSenderId: "96611509888",
  appId:"1:96611509888:web:489d75c2cf35aa6b9c6865",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
