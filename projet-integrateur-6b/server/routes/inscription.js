const express = require('express');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }) ;

const path = require('path');
router = express.Router();
const fctDB = require("../db/bdd_fonctions.js");
//Partie gestion de mail
const child = require('child_process');



router.use(bodyParser.json()); // Analyser les données JSON

//Reception de l'envoie du formulaire d'inscription
router.post('/inscription', urlencodedParser, async (req, res) => {
    try {
      const jsonData = JSON.parse(JSON.stringify(req.body));
      await fctDB.inscription(jsonData.username, jsonData.birthday, jsonData.mail, jsonData.password);
      console.log('success');
      res.status(201).json({ message: 'Inscription réussie' });
      // à retirer le mail dans la base de donnée
      let data_Mail=
      {
        mail:jsonData.mail
      }
      const pythonProcess = child.spawn('python', ['./public/ScriptPy/mail.py',jsonData.mail,'Votre inscription a PokerGang',`Bonjour ${jsonData.username} ! \n \n Nous sommes content de vous annoncer que vous avez bien rejoins le gang Fripouille PAN PAN ! \n \n  `]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      pythonProcess.on('close', (code) => {
        console.log(`Le processus Python s'est terminé avec le code ${code}`);
      });

    } catch (error) {
      console.log('Erreur dans l\'inscription', error);
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router




