const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config/db');

const PORT = 3000;
const app = express();
connection();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/country',require('./routes/countries'));
app.use('/games',require('./routes/games'));

app.listen(PORT,()=>
{
    console.log("Server running on 3000")
})