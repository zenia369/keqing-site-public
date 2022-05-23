import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore} from 'firebase-admin/firestore';

import serviceAccount from '../data/serviceAccountKey.js';

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


export default Store
