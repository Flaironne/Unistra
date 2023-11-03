const express = require('express');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }) ;
const path = require('path');
router = express.Router();
const fctDB = require("../db/bdd_fonctions.js");


router.post("/changemotdepass",urlencodedParser,async (req, res)=>{
    const{iduser,password} = req.body;
    console.log(id_user);
    try{
            await fctDB.change_pwd(iduser,password);
            res.status(200).json({ message: 'MotDePass Change Réussi'});
    } catch {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;