import admin from "firebase-admin";

// ✅ Firebase JSON को env var से read करें
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
