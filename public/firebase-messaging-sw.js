// Service Worker para Firebase Cloud Messaging (FCM)
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Inicializar Firebase dentro del Service Worker
const firebaseConfig = {
  apiKey: "PLACEHOLDER_FIREBASE_API_KEY",
  authDomain: "PLACEHOLDER_FIREBASE_AUTH_DOMAIN",
  projectId: "PLACEHOLDER_FIREBASE_PROJECT_ID",
  storageBucket: "PLACEHOLDER_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "PLACEHOLDER_FIREBASE_MESSAGING_SENDER_ID",
  appId: "PLACEHOLDER_FIREBASE_APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

// Manejo de mensajes push recibidos en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensaje recibido en segundo plano:', payload);

  const title = (payload && payload.notification && payload.notification.title) 
    ? payload.notification.title 
    : 'Molino Viejo';

  const body = (payload && payload.notification && payload.notification.body)
    ? payload.notification.body
    : 'Tienes una actualización sobre tus pedidos.';

  const icon = (payload && payload.notification && payload.notification.icon)
    ? payload.notification.icon
    : 'img/logo.png';

  const notificationOptions = {
    body: body,
    icon: icon,
    badge: 'img/favicon.ico',
    data: (payload && payload.data) ? payload.data : {}
  };

  return self.registration.showNotification(title, notificationOptions);
});
