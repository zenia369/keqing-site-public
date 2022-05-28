const { initializeApp, cert } = require('firebase-admin/app');
const  { getFirestore} = require('firebase-admin/firestore');

const serviceAccount = require('../data/serviceAccountKey');

initializeApp({
    credential: cert(serviceAccount)
});
  
const db = getFirestore();


class Store {
    static async getData(doc, option) {
        const snapshot = await db.collection(process.env.FIRE_STORE_COLLECTION).doc(doc).get();
        const data = snapshot.data();

        return data[option]
    }
}


module.exports = Store
