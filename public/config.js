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
