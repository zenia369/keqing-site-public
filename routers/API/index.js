const Router = require('express');
const router = Router();


const emailAPI = require('./emailAPI');
const myWifeAPI = require('./myWifeAPI');
const homeImagesAPI = require('./main_imagesAPI');

router.use('/api', emailAPI);
router.use('/api', myWifeAPI);
router.use('/api', homeImagesAPI);


module.exports = router