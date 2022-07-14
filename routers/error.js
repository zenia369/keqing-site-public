const Router = require('express');
const router = Router();
const fs = require('fs');
const Path = require('path');

router.all('*', (req, res) => {
    const fileName = Path.resolve(__dirname, `../public${req.url}`);

    if (!fs.existsSync(fileName)) {
        res.status(404).sendFile(Path.resolve(__dirname, '../public/pages/error/error.html'))
    }
})

module.exports = router