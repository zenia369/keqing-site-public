import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import firebaseConfig from '../../../../data/firebaseConfig.json'; 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default async (email, password) => {
    try {
        const {user} = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await user.getIdToken();
    
        const {uid} = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'CSRF-Token': Cookies.get('XSRF-TOKEN')
            },
            body: JSON.stringify({idToken})
        })
        .then(res => res.json())
        .catch(() => {uid: undefined})
    
        return uid
    } catch (error) {
        return undefined
    }

}