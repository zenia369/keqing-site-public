const Router = require('express');
const router = Router();

//service
const db = require('../../service/fireStoreService');


router.get('/login-images', async (req, res) => {
    try {
        const list = await db.getData('pages','login-images')
        
        res.status(200).send(JSON.stringify(list));
    } catch (error) {
        console.warn(`Error in send list to 'login': ${error}`);
    }
})

module.exports = router