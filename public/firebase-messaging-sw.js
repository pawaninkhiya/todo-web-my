importScripts("https://www.gstatic.com/firebasejs/11.3.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.3.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyCJ8stX7mvrkRdd0Ex9e0TCo9tsNcZqOGM",
    authDomain: "dailylog-ad2b9.firebaseapp.com",
    projectId: "dailylog-ad2b9",
    storageBucket: "dailylog-ad2b9.firebasestorage.app",
    messagingSenderId: "653758762920",
    appId: "1:653758762920:web:0b8e9034ea978816d0979d",
    measurementId: "G-LX87JM5ZMN"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);

    const notificationTitle = payload.notification?.title || 'New Notification';
    const notificationOptions = {
        body: payload.notification?.body || '',
        icon: payload.notification?.icon || '/logo192.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
// importScripts("https://www.gstatic.com/firebasejs/11.3.0/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/11.3.0/firebase-messaging-compat.js");

// const firebaseConfig = {
//     apiKey: "AIzaSyCJ8stX7mvrkRdd0Ex9e0TCo9tsNcZqOGM",
//     authDomain: "dailylog-ad2b9.firebaseapp.com",
//     projectId: "dailylog-ad2b9",
//     storageBucket: "dailylog-ad2b9.firebasestorage.app",
//     messagingSenderId: "653758762920",
//     appId: "1:653758762920:web:0b8e9034ea978816d0979d",
//     measurementId: "G-LX87JM5ZMN"
// };


// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// // messaging.onBackgroundMessage((payload) => {
// // 	console.log("Received Background Message:", payload);
// // });
