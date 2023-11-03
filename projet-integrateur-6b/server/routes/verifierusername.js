const express = require('express');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }) ;
const path = require('path');
router = express.Router();
const fctDB = require("../db/bdd_fonctions.js");




router.post("/verifierusername",urlencodedParser,async (req, res)=>{
    const{iduser,username} = req.body;
    try{
        let respDB=await fctDB.check_pseudo_exists(username);
        if (respDB) 
        {
            res.status(200)   
        }else
        {
            res.status(409) 
        }
    } catch {
        res.status(400).json({ message: err.message });
    }
});




module.exports = router;