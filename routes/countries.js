const express = require('express');
const router = express.Router();
const Country = require('./../models/countries');

router.post('/add',async(req,res)=>
{
    const {name} = req.body;
    const newCountry = new Country(
        {
            name:name
        }
    );
    const country = await newCountry.save();
    if(country)
    {
        res.status(200).json({message:"Country saved successfully",countryData:country});
    }
    else
    {
        res.status(404).json({error:"Could not be saved"});
    }
});



module.exports = router;