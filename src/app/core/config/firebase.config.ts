/**
 * Replace the placeholder values with the Firebase Web App configuration
 * from the Firebase console before enabling real Google/Facebook sign-in.
 * No secrets are stored in this source tree.
 */
/* export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
}; */
 export const firebaseConfig = {
  apiKey: "AIzaSyDTu2qeKGoY4AzKl-qAR4rrKup7kRi0nLM",
  authDomain: "online-publishing-f6041.firebaseapp.com",
  projectId: "online-publishing-f6041",
  storageBucket: "online-publishing-f6041.firebasestorage.app",
  messagingSenderId: "653875737621",
  appId: "1:653875737621:web:590348e988a80d373fca1c",
  measurementId: "G-9L8PHGJT3N"
};

export const isFirebaseConfigured =
  Object.values(firebaseConfig).every(Boolean);



