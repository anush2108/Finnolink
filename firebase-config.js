import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDED64RHZH0WAztf5uvyNx3e8dLFJDN-W4",
  authDomain: "ai-chatbot-4579b.firebaseapp.com",
  databaseURL: "https://ai-chatbot-4579b-default-rtdb.firebaseio.com",
  projectId: "ai-chatbot-4579b",
  storageBucket: "ai-chatbot-4579b.appspot.com",
  messagingSenderId: "849839955899",
  appId: "849839955899:web:61dc2eef17b974de132e9e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDED64RHZH0WAztf5uvyNx3e8dLFJDN-W4",
//   authDomain: "ai-chatbot-4579b.firebaseapp.com",
//   projectId: "ai-chatbot-4579b",
//   storageBucket: "ai-chatbot-4579b.firebasestorage.app",
//   messagingSenderId: "849839955899",
//   appId: "1:849839955899:web:61dc2eef17b974de132e9e",
//   measurementId: "G-KZHBEQHG83"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDED64RHZH0WAztf5uvyNx3e8dLFJDN-W4",
//   authDomain: "ai-chatbot-4579b.firebaseapp.com",
//   databaseURL: "https://ai-chatbot-4579b-default-rtdb.firebaseio.com/",** // 🔥 Add this line
//   projectId: "ai-chatbot-4579b",
//   storageBucket: "ai-chatbot-4579b.appspot.com", // 🔄 fixed typo from `.app` to `.appspot.com`
//   messagingSenderId: "849839955899",
//   appId: "1:849839955899:web:61dc2eef17b974de132e9e",
//   measurementId: "G-KZHBEQHG83"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);  