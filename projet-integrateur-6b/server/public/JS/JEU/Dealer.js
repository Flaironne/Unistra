/**
 * @brief Classe "Dealer" qui permet d'interpréter le rôle du croupier
 *        au poker avec la possibilitée de mettre les Cartes sur la 
 *        table, de distribuer les Cartes aux joueurs, de mélanger
 *        le paquet de Carte, de répartir les jetons entre les joueurs
 *        et de révéler les Cartes afin de déterminer un vainqueur.
 */

//import Carte from './Carte.js';
const Carte = require('./Carte.js')
// import Role from '../Roles/Role.js';
const Role = require('../Roles/Role.js');
//import BDD from '../bd/bdd_fonctions.js';
const fctDB = require("../../../db/bdd_fonctions");

class Dealer {
    #paquetCarte = new Array(52);
    #CarteTable = new Array(5);
    #jetonsSurTable = 0;
    #rolesDisponible = new Array(6);

    constructor (){
        for (let i = 0; i < 4; i++){
            for (let y = 0; y < 13; y++){
                this.#paquetCarte[y + i * 13] = new Carte.Carte (y+2, i+1);
            }
        }

        for (let i = 0; i < 6; i++){
            this.#rolesDisponible[i] = true;
        }
    }

    /**
     * @brief Getter de l'attribut paquetCarte.
     * 
     * @returns[out] Retourne le paquet de Carte.
     */
    get paquetCarte (){
        return this.#paquetCarte;
    }


    /**
     * @brief Getter de l'attribut CarteTable.
     * 
     * @returns[out] Retourne les Cartes de la table.
     */
    get CarteTable (){
        return this.#CarteTable;
    }

    /**
     * @brief Getter de l'attribut jetonsSurTable.
     * 
     * @returns[out] Retourne les jetons disponible sur la table.
     */
    get jetonsSurTable (){
        return this.#jetonsSurTable;
    }

    /**
     * @brief Setter de l'attribut jetonsSurTable.
     */
    set jetonsSurTable (jetonsSurTable){
        this.#jetonsSurTable = jetonsSurTable;
    }

    get rolesDisponible (){
        return this.#rolesDisponible;
    }

    set rolesDisponible (rolesDisponible){
        this.#rolesDisponible = rolesDisponible;
    }
    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction permettant de mélanger le paquet de Carte.
     * 
     * @returns[in] Retourne le paquet de Carte mélangé.
     */
    melangerPaquetCarte (){
        this.#paquetCarte.sort(()=> Math.random () - 0.5);
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui initialise les Cartes sur la table.
     * 
     * @returns[in] Retourne un tableau de Carte contenant les Cartes de la table de poker.
     */
    initCarteTable (){
        this.melangerPaquetCarte ();
        for (let i = 0; i < 5; i++){
            
            let indice = Math.floor (Math.random () * 52);
            while (!this.#paquetCarte[indice].disponible)
                indice = Math.floor (Math.random () * 52);
            this.#CarteTable[i] = this.#paquetCarte[indice];
            this.#paquetCarte[indice].disponible = false;
            console.log ("CARTE : " + this.#paquetCarte[indice].disponible);
        }
    }

    /**
     * @author Hayk ZARIKIAN 
     * @brief Fonction qui initialise le rôle des joueurs sur la table.
     * 
     * @param {Joueur[2..6]} joueurs 
     */
    initRoles (joueurs){
        joueurs.forEach((joueur) => {
            joueur.role = new Role.Role(this.#rolesDisponible);
            this.#rolesDisponible[joueur.role.idRole] = false;
        });
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui permet de distribuer deux Cartes à un joueur donné.
     * 
     * @param {Joueur} joueur 
     */
    distribue (joueur){
        this.melangerPaquetCarte ();
        let Cartes = new Array (2);

        for (let i = 0; i < 2; i++){
            let indice = Math.floor (Math.random () * 52);
            while (!this.#paquetCarte[indice].disponible)
                indice = Math.floor (Math.random () * 52);
            Cartes[i] = this.#paquetCarte[indice];
            this.#paquetCarte[indice].disponible = false;
        }
        joueur.recevoirCarte (Cartes);
    }

    /**
     * 
     * @author Hayk ZARIKIAN
     * @brief TODO
     */
    deposeCarteTable (){
        // TODO 
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui crée le rang des joueurs selon ses Cartes
     *        et les Cartes de la table, détermine le vainqueur et 
     *        appelle la fonction d'attribution des Cartes.
     * 
     * @param {Joueur[2..6]} joueurs 
     * @returns[out] Retourne un tableau d'indices avec le ou les joueurs gagnants.
     */
    revelationCarteJoueur (joueurs){
        let rangJoueurs = joueurs.map((joueur) => {
            if (!joueur || joueur.coucher == true) return -1;
            joueur.mains.creeRang (this.#CarteTable);
            return joueur.mains.rang.valeur;
        });

        for (let i = 0; i < 6; i++){
            if (rangJoueurs[i] == null)
                rangJoueurs[i] = -1;
        }

        let rangMax = Math.max.apply(null, rangJoueurs);
        let indiceJoueurs = rangJoueurs.reduce((indiceJoueurs, rang, index) => {
            if (rang == rangMax) indiceJoueurs.push(index);
            return indiceJoueurs;
        }, []);

        if (indiceJoueurs.length == 1){
            this.attributionDesGains (joueurs, indiceJoueurs);
            return indiceJoueurs;
        }
        else {
            let sommeMax = Math.max.apply(
                null, indiceJoueurs.map((indice) => joueurs[indice].mains.cartes[0].valeur + joueurs[indice].mains.cartes[1].valeur)
            );

            let indicesJoueursGagnants = indiceJoueurs.filter(
                (indice) => joueurs[indice].mains.cartes[0].valeur + joueurs[indice].mains.cartes[1].valeur == sommeMax
            );

            this.attributionDesGains (joueurs, indicesJoueursGagnants);
            return indicesJoueursGagnants;
        }
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui fait appelle à la base de données afin
     *        d'établir les gains aux joueurs gagnants.
     * 
     * @param {Joueur[1..6]} joueursGagnants 
     */
    attributionDesGains (joueurs, joueursGagnants){
        // à supprimer les deux lignes
        // BDD.db_open ();
        // BDD.create_tables ();
        if (joueursGagnants.length == 1){
            fctDB.add_winner (joueurs[joueursGagnants[0]].idJoueur, this.#jetonsSurTable);
        }
        else{
            joueursGagnants.forEach((indice) =>{
                fctDB.add_winner(joueurs[indice].idJoueur, Math.floor(this.#jetonsSurTable / joueursGagnants.length));
            })
        }
    }
}


module.exports={
    Dealer
}