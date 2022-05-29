const Router = require('express');
const router = Router();


const emailAPI = require('./emailAPI');
const myWifeAPI = require('./myWifeAPI');
const homeImagesAPI = require('./main_imagesAPI');
const loginImagesAPI = require('./login_images');

router.use('/api', emailAPI);
router.use('/api', myWifeAPI);
router.use('/api', homeImagesAPI);
router.use('/api', loginImagesAPI);

module.exports = router