import Router from 'express';
const router = Router();
import fs from 'fs';

import { fileURLToPath } from 'url';
import Path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('*', (req, res) => {
    const fileName = Path.resolve(__dirname, `../public${req.url}`);

    if (!fs.existsSync(fileName)) {
        res.status(404).sendFile(Path.resolve(__dirname, '../public/pages/error/error.html'))
    }
})

export default router