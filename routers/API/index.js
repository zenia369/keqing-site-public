import Router from 'express';
const router = Router();

import emailAPI from './emailAPI.js';
import myWifeAPI from './myWifeAPI.js';
import homeImagesAPI from './main_imagesAPI.js'

router.use('/api', emailAPI);
router.use('/api', myWifeAPI);
router.use('/api', homeImagesAPI);


export default router