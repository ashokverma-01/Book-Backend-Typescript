import admin from "firebase-admin";

// Step 1: Parse JSON from environment variable
const rawFirebaseConfig = process.env.FIREBASE_CONFIG_JSON;
const serviceAccount = JSON.parse(rawFirebaseConfig);

// Step 2: Fix PEM newline issue
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

// Step 3: Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
