const admin = require('firebase-admin');

const secret = require('./secret.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(secret)
    });
}

let db = admin.firestore();

module.exports =  {db};