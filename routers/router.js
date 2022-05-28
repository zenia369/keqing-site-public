const Router = require('express');
const router = Router();
const Path = require('path');



router.get('/', (req, res) => { 

    const fileName = Path.resolve(__dirname, `../public/pages/home/index.html`);

    res.sendFile(fileName);
});

router.get('/myWife', (req, res) => {
    let {url} = req;

    const fileName = Path.resolve(__dirname, `../public/pages/${url}/index.html`);
    
    res.sendFile(fileName);
});

router.get('/aboutMe', (req, res) => {
    let {url} = req;

    const fileName = Path.resolve(__dirname, `../public/pages/${url}/index.html`);
    
    res.sendFile(fileName);
});

router.get('/autorsReview', (req, res) => {
    let {url} = req;

    const fileName = Path.resolve(__dirname, `../public/pages/${url}/index.html`);
    
    res.sendFile(fileName);
});






module.exports = router

