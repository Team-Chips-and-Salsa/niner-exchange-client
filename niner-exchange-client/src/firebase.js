// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

function hasRequiredConfig(cfg) {
    return (
        Boolean(cfg.apiKey) &&
        Boolean(cfg.authDomain) &&
        Boolean(cfg.projectId) &&
        Boolean(cfg.appId)
    );
}

let app = null;
try {
    if (hasRequiredConfig(firebaseConfig)) {
        app = initializeApp(firebaseConfig);
    } else {
        console.warn(
            '[Firebase] Missing required environment variables. Skipping Firebase init.',
        );
    }
} catch (e) {
    console.error('[Firebase] Initialization error:', e);
}

export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;
