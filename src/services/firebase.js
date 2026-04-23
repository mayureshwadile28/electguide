import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// This is typically provided via environment variables, but for demonstration
// purposes in this simulation environment, we will mock the config.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MOCKMEASURE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics = null;

export const initAnalytics = async () => {
    try {
        const supported = await isSupported();
        if (supported) {
            analytics = getAnalytics(app);
            console.log("Firebase Analytics Initialized Successfully.");
        }
    } catch (e) {
        console.error("Firebase Analytics initialization failed:", e);
    }
};

export { app, analytics };
