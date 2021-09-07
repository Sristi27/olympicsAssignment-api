const mongoose = require('mongoose');
let connection = () =>
{
    mongoose.connect("mongodb://localhost:27017/olympics",{useNewUrlParser:true,useUnifiedTopology:true}).
    then(res=>
        {
            console.log("Connected to db");
        }).catch(err=>console.log(err))
}

module.exports = connection