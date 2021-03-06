const Router = require('express');
const router = Router();
const Path = require('path');

//middlewares
const loginMiddlewar = require('../middlewares/login');

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

router.get('/login?:continuePath', loginMiddlewar, (req, res) => {

    const fileName = Path.resolve(__dirname, `../public/pages/login/index.html`);

    res.sendFile(fileName);
})

router.get('/registration', (req, res) => {
    let {url} = req;

    const fileName = Path.resolve(__dirname, `../public/pages/${url}/index.html`);
    
    res.sendFile(fileName);
})

router.get('/logout', (req, res) => {
    res.clearCookie("session");
    res.redirect('/')
})





module.exports = router

