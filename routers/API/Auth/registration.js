const Router = require('express');
const router = Router();

const db = require('../../../service/fireStoreService');

const fireRegistration = require('../../../service/fireRegistration');

router.post('/registration', async (req, res) => {
    try {
        const {body} = req;

        const {options, sessionCookie, uid} = await fireRegistration(body);

        await db.createUserData({uid, ...body});

        res.cookie('session', sessionCookie, options);
        res.status(200).send(JSON.stringify({uid}));
    
    } catch (error) {
        console.log(error);
        res.status(401).end(JSON.stringify({message: 'user exist, try another email'}))
    }

});

module.exports = router