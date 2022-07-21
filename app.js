require('dotenv').config();
const express = require('express');
const app = express();
const Path = require('path');
const exphbs = require('express-handlebars');

const csurf = require('csurf');
const cookieParser = require('cookie-parser');

const admin = require('firebase-admin');
const serviceAccount = require('./data/serviceAccountKey');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_BUCKET_NAME
});


//Routes
const siteRouter = require('./routers/router');
const wifeRouter = require('./routers/router.wife.modules');
const profileRouter = require('./routers/router.userProfile.modules');
const errorRouter = require('./routers/error');

//API
const api = require('./routers/API/index');

const csrufSecure = csurf({cookie: true});



const PORT = process.env.PORT ?? 5000;


app.use(express.static(Path.join(__dirname, 'public')));

const hbs = exphbs.create({
    defaultLayout: 'layout',
    extname: '.hbs'
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

hbs.handlebars.registerHelper('when', (operand_1, operator, operand_2) => {
    const operators = {
     '>': function(l,r) { return Number(l) > Number(r); },
     '<': function(l,r) { return Number(l) < Number(r); },
    };
    const result = operators[operator](operand_1,operand_2);
  
    if (result) return true;
    else  return false;
});



app.use(express.json());
app.use(cookieParser());
app.use(csrufSecure);
app.all('*', (req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
})

app.use(siteRouter);
app.use(wifeRouter);
app.use(profileRouter);

app.use(api)

app.use(errorRouter)





app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})


