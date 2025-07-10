import { useEffect, useState } from "react";
import { useAuth } from "@contexts/AuthProvider";
import type { MessagePayload } from "firebase/messaging";
import { onMessageListener, requestFCMToken } from "src/firebase";

export const useFirebaseMessaging = () => {
    const { setFcmToken } = useAuth();
    const [notification, setNotification] = useState<MessagePayload | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const initializeMessaging = async () => {
            try {
                if (!("serviceWorker" in navigator)) {
                    throw new Error("Service Worker not supported");
                }

                const registration = await navigator.serviceWorker.ready;
                if (!registration) {
                    throw new Error("Service Worker registration not found");
                }

                const token = await requestFCMToken();
                if (token) {
                    setFcmToken(token);
                    console.log("FCM Token:", token);
                }

                const unsubscribe = onMessageListener((payload) => {
                    console.log("Foreground FCM message:", payload);
                    setNotification(payload);
                    // You can show a toast notification here if needed
                });

                return () => unsubscribe();
            } catch (err) {
                console.error("Error in Firebase messaging:", err);
                setError(err instanceof Error ? err : new Error(String(err)));
            }
        };

        initializeMessaging();
    }, [setFcmToken]);

    return { notification, error };
};
// import { useAuth } from "@contexts/AuthProvider";
// import { useEffect, useState } from "react";
// import { onMessageListener, requestFCMToken } from "src/firebase";

// export const useFirebaseMessaging = () => {
//     const { setFcmToken } = useAuth();
//     const [notification, setNotification] = useState<any>(null);
//     const [error, setError] = useState<Error | null>(null);

//     useEffect(() => {
//         const initializeMessaging = async () => {
//             try {
//                 // Ensure service worker is supported
//                 if (!("serviceWorker" in navigator)) {
//                     throw new Error("Service Worker not supported");
//                 }

//                 // Ensure service worker is ready
//                 const registration = await navigator.serviceWorker.ready;
//                 if (!registration) {
//                     throw new Error("Service Worker registration not found");
//                 }

//                 // Request notification permission and get token
//                 const token = await requestFCMToken();
//                 if (token) {
//                     setFcmToken(token);
//                     console.log("FCM Token:", token);
//                 }

//                 // Listen for foreground messages
//                 onMessageListener((payload) => {
//                     console.log("Foreground FCM message:", payload);
//                     setNotification(payload);
//                 });

//             } catch (err) {
//                 console.error("Error in Firebase messaging:", err);
//                 setError(err instanceof Error ? err : new Error(String(err)));
//             }
//         };

//         initializeMessaging();
//     }, [setFcmToken]);

//     return { notification, error };
// };
