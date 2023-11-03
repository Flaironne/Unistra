const express = require('express');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }) ;
const path = require('path');
router = express.Router();
const fctDB = require("../db/bdd_fonctions.js");




router.post("/changeusername",urlencodedParser,async (req, res)=>{
    const{iduser,username} = req.body;
    try{
            let checkBDD=await fctDB.check_pseudo_exists(username);
            if (checkBDD)
            {
                res.status(409).json({ message: 'Le pseudo n\'a pas été changé'});
            }else
            {
                fctDB.update_pseudo(iduser,username);
                res.status(200).json({ message: 'Le pseudo a été changé avec succès'});
            }
    } catch {
        res.status(400).json({ message: err.message });
    }
});




module.exports = router;