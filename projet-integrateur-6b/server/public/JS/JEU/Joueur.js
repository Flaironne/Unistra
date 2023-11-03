/**
 * @brief Classe "Joueur" qui permet de créer un joueur avec 
 *        l'extraction du idJoueur, jetons et le noLimitSelfLimited sélectionné
 *        par le joueur. Un joueur possède une main contenant les deux cartes
 *        avec un rang qui définie la valeur de sa main. Ill peut effectuer 
 *        les actions classiques au poker (miser, checker, suivre ou se coucher).
 */

//import Mains from '../Jeu/Mains.js';
const Mains = require('./Mains.js');
// import BDD from '../bd/bdd_fonctions.js';
const fctDB = require("../../../db/bdd_fonctions");

class Joueur{
    #idJoueur;
    #nomJoueur;
    #role;
    #mains;
    #jetons;
    #deposeJetons = 0;
    #coucher = false;
    #firstShooter = false;
    #noLimitSelfLimited;
    #jaiDejaJouerMonTour = false;
    #estDeconnecte = false;
 
    constructor (idJoueur, nomJoueur, jetons, noLimitSelfLimited){
        this.#idJoueur = idJoueur;
        this.#nomJoueur = nomJoueur;
        this.#jetons = jetons;
        this.#noLimitSelfLimited = noLimitSelfLimited;
    }

    /**
     * @brief Getter de l'attribut idJoueur.
     * 
     * @return[out] Retourne le idJoueur du joueur.
     */
    get idJoueur (){
        return this.#idJoueur;
    }

    /**
     * @brief Setter del'attribut idJoueur.
     */
    set idJoueur (idJoueur){
        this.#idJoueur = idJoueur;
    }

    /**
     * @brief
     */
    get nomJoueur (){
        return this.#nomJoueur;
    }

    /**
     * 
     */
    get role(){
        return this.#role;
    }

    /**
     * 
     */
    set role (role){
        this.#role = role;
    }

    /**
     * @brief Getter de l'attribut mains.
     * 
     * @returns[out] Retourne la main du joueur.
     */
    get mains(){
        return this.#mains;
    }

    /**
     * @brief Setter de l'attribut mains.
     */
    set mains (mains){
        this.#mains = mains;
    }

    /**
     * @brief Getter de l'attribut jetons.
     * 
     * @returns[out] Retourne la valeur des jetons.
     */
    get jetons (){
        return this.#jetons;
    }

    /**
     * @brief Setter de l'attribut jetons.
     */
    set jetons (jetons){
        this.#jetons = jetons;
    }

    /**
     * 
     */
    get deposeJetons (){
        return this.#deposeJetons;
    }

    /**
     * 
     */
    set deposeJetons (jetons){
        this.#deposeJetons = jetons;
    }

    /**
     * @brief Getter de l'attribut coucher.
     * 
     * @returns[out] Retourne si le joueur est couché ou non.
     */
    get coucher (){
        return this.#coucher;
    }

    /**
     * @brief Setter de l'attribut coucher.
     * 
     * @param {boolean} coucher
     */
    set coucher (coucher){
        this.#coucher = coucher
    }

    /**
     * @brief Getter de l'attribut firstShooter.
     * 
     * @returns[out] Retourne si le joueur est le firstShooter ou non.
     */
    get firstShooter (){
        return this.#firstShooter;
    }

    /**
     * @brief Setter de l'attribut firstShooter.
     * 
     * @param {boolean} firstShooter
     */
    set firstShooter (firstShooter){
        this.#firstShooter = firstShooter;
    }

    /**
     * @brief Getter de l'attribut noLimitSelfLimited.
     * 
     * @returns[out] Retourne la valeur de limite.
     */
    get noLimitSelfLimited (){
        return this.#noLimitSelfLimited
    }

    /**
     * 
     */
    get jaiDejaJouerMonTour(){
        return this.#jaiDejaJouerMonTour;
    }

    /**
     * 
     */
    set jaiDejaJouerMonTour (jaiDejaJouerMonTour){
        this.#jaiDejaJouerMonTour = jaiDejaJouerMonTour;
    }

    /**
     * @brief
     */
    get estDeconnecte (){
        return this.#estDeconnecte;
    }

    /**
     * @brief
     */
    set estDeconnecte (estDeconnecte){
        this.#estDeconnecte = estDeconnecte;
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui permet au joueur de recevoir les cartes dans la main. 
     * 
     * @param {Carte[2]} carte 
     * @returns[in] Retourne une mains initialiser par deux cartes.
     */
    recevoirCarte (cartes){
        this.#mains = new Mains.Mains (cartes);
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui permet au joueur de miser des jetons.
     * 
     * @param {int} jetons 
     * @returns[in] Nouveau solde de jetons.
     */
    miser (dealer, jetons){
        //this.#jaiDejaJouerMonTour = true;   // modifffffffffffffffffffffffffffffffffffffffffff
        this.#jetons -= jetons; 
        this.#deposeJetons += jetons;
        dealer.jetonsSurTable += jetons;
        fctDB.bet(this.#idJoueur, jetons);
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui réalise aucune action de la part du joueur
     *        mais fait passer son tour.
     * 
     */
    check (){
        this.#jaiDejaJouerMonTour = true;
    }

    /**
     * @author Florian WU
     * @brief 
     */
    seCoucher (){
        this.#coucher = true;
        this.#jaiDejaJouerMonTour = true;
    }
}
module.exports={Joueur}