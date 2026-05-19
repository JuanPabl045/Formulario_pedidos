// ⚠️ CONFIGURATION FILE - DO NOT COMMIT SECRETS TO GIT
// Use environment variables to set these values during deployment

// Load from window variables (set by build process or .env file)
const firebaseConfig = {
  apiKey: window.FIREBASE_API_KEY || "PLACEHOLDER_FIREBASE_API_KEY",
  authDomain: window.FIREBASE_AUTH_DOMAIN || "PLACEHOLDER_FIREBASE_AUTH_DOMAIN",
  projectId: window.FIREBASE_PROJECT_ID || "PLACEHOLDER_FIREBASE_PROJECT_ID",
  storageBucket: window.FIREBASE_STORAGE_BUCKET || "PLACEHOLDER_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: window.FIREBASE_MESSAGING_SENDER_ID || "PLACEHOLDER_FIREBASE_MESSAGING_SENDER_ID",
  appId: window.FIREBASE_APP_ID || "PLACEHOLDER_FIREBASE_APP_ID"
};

const googleMapsApiKey = window.GOOGLE_MAPS_API_KEY || "PLACEHOLDER_GOOGLE_MAPS_API_KEY";
const whatsappNumber = window.WHATSAPP_NUMBER || "PLACEHOLDER_WHATSAPP_NUMBER";

// Expose to window for runtime scripts (social-links.js, other pages)
window.firebaseConfig = window.firebaseConfig || firebaseConfig;
window.googleMapsApiKey = window.googleMapsApiKey || googleMapsApiKey;
window.whatsappNumber = window.whatsappNumber || whatsappNumber;

// Central social links - edit these values here or provide env vars via env-loader
window.socialLinks = window.socialLinks || {
  facebook: window.SOCIAL_FACEBOOK || 'https://www.facebook.com/tu-pagina',
  instagram: window.SOCIAL_INSTAGRAM || 'https://www.instagram.com/tu-cuenta',
  whatsapp: (function () {
    const explicit = window.SOCIAL_WHATSAPP || '';
    const base = explicit || whatsappNumber || '';
    const num = String(base).replace(/\D/g, '');
    return num ? `https://wa.me/${num}` : `https://wa.me/51989719386`;
  })()
};
