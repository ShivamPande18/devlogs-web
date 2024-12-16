// Using environment variables (not working)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Using direct values for now
// const firebaseConfig = {
//     apiKey: "AIzaSyA2UWh17YyktnC7i_DWbvkWxgHt6HQzF98",
//     authDomain: "devslog-97116.firebaseapp.com",
//     projectId: "devslog-97116",
//     storageBucket: "devslog-97116.appspot.com",
//     messagingSenderId: "220123085362",
//     appId: "1:220123085362:web:d55f7f3d0c776b58be9a2b",
//     measurementId: "G-FNNMDMCPY0"
// };

export default firebaseConfig;