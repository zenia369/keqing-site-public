const Router = require('express');
const router = Router();

const securedUserRouter = require('../middlewares/securedUserRouter');
const db = require('../service/fireStoreService');
const charactersList = require('../data/charactersList');

router.get('/userProfile', securedUserRouter, async (req, res) => {
    try {
        const {uid} = req.query;

        if(!uid) throw Error()

        const user = await db.getUserData(uid);
        if(!user) throw Error()

        res.render('profile', {
            layout: 'layout-profile',
            user,
            charactersList,
        })
    
    } catch (error) {
        res.redirect('/login?continuePath='+req.url)
    }
    
});

module.exports = router