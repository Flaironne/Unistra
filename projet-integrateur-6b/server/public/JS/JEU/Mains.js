/**
 * @brief Classe "Mains" qui permet de créer une main avec 
 *        les deux cartes du joueur et le rang de sa main.
 */

//import Rang from './Rang.js';
const Rang = require('./Rang.js');

class Mains{
    #cartes = new Array(2);
    #rang; 

    constructor (cartes){
        this.#cartes[0] = cartes[0];
        this.#cartes[1] = cartes[1];
    }

    /**
     * @brief Getter de l'attribut cartes.
     * 
     * @returns[out] Retourne le tableau de deux cartes.
     */
    get cartes (){
        return this.#cartes;

    }

    /**
     * @brief Setter de l'attribut cartes.
     */
    set cartes (cartes){
        this.#cartes = cartes;

    }

    /**
     * @brief Getter de l'attribut rang.
     * 
     * @returns[out] Retourne un rang avec sa valeur.
     */
    get rang (){
        return this.#rang;
    }

    /**
     * @brief Fonction qui permet de créer le rang du joueur 
     *        en prenant compte de ses cartes et des cartes de 
     *        la table.
     */
    creeRang (carteTable){
        this.#rang = new Rang.Rang (this.#cartes, carteTable);
    }
}

module.exports={Mains}