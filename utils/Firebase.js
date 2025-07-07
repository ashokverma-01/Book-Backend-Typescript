import admin from "firebase-admin";
import fs from "fs";

const raw = fs.readFileSync("./utils/firebase-adminsdk.json", "utf8");
const serviceAccount = JSON.parse(raw);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export default admin;
