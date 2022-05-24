import Router from 'express';
const router = Router();


import { fileURLToPath } from 'url';
import Path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



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

// router.get('/userProfile', (req, res) => {
//     let {url} = req;

//     const fileName = Path.resolve(__dirname, `../public/pages/${url}/index.html`);
    
//     res.sendFile(fileName);
// });





export default router;

