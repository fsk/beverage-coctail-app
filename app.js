const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const apiRouter = require('./src/routers/apiRouter');

const app = express();

app.use(expressLayout);
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));


app.use('/', apiRouter);
app.use('/beverage', apiRouter);




app.listen(3000, () => {
    console.log(`Server 3000 portunda calisiyor`);
})