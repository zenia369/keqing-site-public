import 'dotenv/config'
import express from 'express';
const app = express();
import { fileURLToPath } from 'url';
import Path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import exphbs from 'express-handlebars';

//Routes
import siteRouter from './routers/router.js';
import wifeRouter from './routers/router.wife.modules.js';
import profileRouter from './routers/router.userProfile.modules.js';
import errorRouter from './routers/error.js';

//API
import api from './routers/API/index.js'


const PORT = process.env.PORT ?? 5000;


app.use(express.static(Path.join(__dirname, './publicHBS')));
app.use(express.static(Path.join(__dirname, './public')));

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');




app.use(express.json());
app.use(siteRouter);
app.use(wifeRouter);
app.use(profileRouter);

app.use(api)

app.use(errorRouter)




app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})


