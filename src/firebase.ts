import { initializeApp, type FirebaseApp } from "firebase/app";
import {
    getMessaging,
    getToken,
    onMessage,
    type MessagePayload,
    type Messaging,
} from "firebase/messaging";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const vapidKey = "BO20SL45HnIvnkP7A50jnEW60CB3w5ov25GiYOV7xvuDPHVVFAtsZ2CTUErSMtw-n95_beb3F2JCtzzK7Ma7Qhs";

const app: FirebaseApp = initializeApp(firebaseConfig);
export const messaging: Messaging = getMessaging(app);

export const requestFCMToken = async (): Promise<string | null> => {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.warn("Notification permission denied.");
            return null;
        }

        const token = await getToken(messaging, { vapidKey });
        return token;
    } catch (error) {
        console.error("Error retrieving FCM token:", error);
        return null;
    }
};

export const onMessageListener = (
    callback: (payload: MessagePayload) => void
) => {
    return onMessage(messaging, callback);
};
// import { initializeApp, type FirebaseApp } from "firebase/app";
// import {
//     getMessaging,
//     getToken,
//     onMessage,
//     type MessagePayload,
//     type Messaging,
// } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID,
//     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// const vapidKey = "BO20SL45HnIvnkP7A50jnEW60CB3w5ov25GiYOV7xvuDPHVVFAtsZ2CTUErSMtw-n95_beb3F2JCtzzK7Ma7Qhs";

// const app: FirebaseApp = initializeApp(firebaseConfig);
// const messaging: Messaging = getMessaging(app);

// // Request FCM token with permission
// export const requestFCMToken = async (): Promise<string | null> => {
//     try {
//         const permission = await Notification.requestPermission();
//         if (permission !== "granted") {
//             console.warn("Notification permission denied.");
//             return null;
//         }

//         const token = await getToken(messaging, { vapidKey });
//         return token;
//     } catch (error) {
//         console.error("Error retrieving FCM token:", error);
//         return null;
//     }
// };

// // Foreground message listener
// export const onMessageListener = (callback: (payload: MessagePayload) => void) => {
//     onMessage(messaging, callback);
// };
