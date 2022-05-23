import Router from 'express';
const router = Router();
import { fileURLToPath } from 'url';
import Path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import Wife from '../service/wifeService.js';
import db from '../service/fireStoreService.js';


router.get('/characters/:name', (req, res) => {
    const name = req.params.name ?? 'keqing';

    Promise.all([ db.getData('characters', `${name}`), Wife.getPathImg(name)])
    .then((props) => {

        if(props[1].images.length === 0 ) {
            throw Error('Error in search character...');
        } else {

            res.render('wife', {
                layout: 'layout-wife',
                ...props[0],
                ...props[1]
            })
        }
    })
    .catch(e => {
        console.warn("Error in send character:", e);
        res.status(500).sendFile(Path.resolve(__dirname, '../public/pages/error/'))
    });
        
    
})


export default router;





