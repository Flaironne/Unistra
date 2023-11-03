const express = require('express');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }) ;
const path = require('path');
router = express.Router();
const fctDB = require("../db/bdd_fonctions.js");
const jeton1 = null;

const session = require("express-session");

router.use(express.json());

//Reception de l'envoie d'un formulaire de connexion
router.post("/connexion", urlencodedParser, async (req, res) => {
    let donnees_connexion = req.body;
    const { username, password } = req.body;
    try {
        var id_user = await fctDB.connexion(username, password);
        var jetons = await fctDB.get_nb_jetons(id_user);            //get jetons from bdd
        console.log(await fctDB.get_user_info(id_user));
        req.session.user = await fctDB.get_user_info(id_user);
        req.session.user.jetons = jetons;                           //ajouter jetons dans le user
        res.status(200).json({ message: 'Connexion Réussi'}); // sending a response to the client
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



module.exports = router;

