const {getAuth:getAuthAdmin} = require('firebase-admin/auth');

const authAdmin = getAuthAdmin();

const { initializeApp } =  require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = require('../data/firebaseConfig.json');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


module.exports = async (cred) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, cred.email, cred.password);
        const idToken = userCredential._tokenResponse.idToken;

        const {uid} = await authAdmin.verifyIdToken(idToken);

        const expiresIn = 60 * 60 * 24 * 5 * 100;
        const sessionCookie = await authAdmin.createSessionCookie(idToken, { expiresIn });
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };

        

        return {
            options,
            sessionCookie,
            uid
        }
        
    } catch (e) {
        throw new Error(e.message)
    }

}