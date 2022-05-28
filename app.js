require('dotenv').config();
const express = require('express');
const app = express();
const Path = require('path');
const exphbs = require('express-handlebars');


//Routes
const siteRouter = require('./routers/router');
const wifeRouter = require('./routers/router.wife.modules');
const profileRouter = require('./routers/router.userProfile.modules');
const errorRouter = require('./routers/error');

//API
const api = require('./routers/API/index');




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


