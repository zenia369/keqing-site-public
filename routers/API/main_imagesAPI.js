const Router = require('express');
const router = Router();

//service
const db = require('../../service/fireStoreService');


router.get('/home-image', async (req, res) => {
    try {
        const list = await db.getData('pages','main_images')
        
        res.status(200).send(JSON.stringify(list));
    } catch (error) {
        console.warn(`Error in send list to 'my wife': ${error}`);
    }
})

module.exports = router