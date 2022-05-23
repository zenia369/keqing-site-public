import Router from 'express';
const router = Router();

//service
import db from '../../service/fireStoreService.js';


router.get('/myWife', async (req, res) => {
    try {
        const list = await db.getData('pages','myWife_cards')
        
        res.status(200).send(JSON.stringify(list));
    } catch (error) {
        console.warn(`Error in send list to 'my wife': ${error}`);
    }
})

export default router