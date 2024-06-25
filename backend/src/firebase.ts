import admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.cert(require("../serviceAccountKey.json") as admin.ServiceAccount),
});

export const db = admin.firestore();

export const auth = admin.auth();
