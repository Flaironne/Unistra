/**
 * @brief Classe "Carte" qui permet de créer une carte avec 
 *        un couple valeur et couleur qui définie la carte. 
 *        Un attribut "disponible" est présent pour indiquer 
 *        si la carte est disponible pour une distribution, ainsi
 *        qu'un attribut "verso" qui indique si la carte est retournée
 *        sur la table.
 */

const DEUX = 2;
const TROIS = 3;
const QUATRE = 4;
const CINQ = 5;
const SIX = 6;
const SEPT = 7;
const HUIT = 8;
const NEUF = 9;
const DIX = 10; 
const VALET = 11;
const DAME = 12;
const ROI = 13;
const AS = 14;

const CARREAU = 1;
const COEUR = 2; 
const PIQUE = 3;
const TREFLE = 4;

class Carte {
    #valeur;
    #couleur;
    #disponible = true;
    #verso = false;

    constructor (valeur, couleur){
        if (valeur >= DEUX && valeur <= AS && couleur >= CARREAU && couleur <= TREFLE){
            this.#valeur = valeur;
            this.#couleur = couleur;
        }
        
    }

    /**
     * @brief Getter de l'attribut valeur.
     * 
     * @returns[out] Retourne la valeur de la carte.
     */
    get valeur (){
        return this.#valeur;
    }

    set valeur (valeur){
        this.#valeur = valeur;
    }

    /**
     * @brief Getter de l'attribut couleur.
     * 
     * @returns[out] Retourne la couleur de la carte.
     */
    get couleur (){
        return this.#couleur;
    }

    set couleur (couleur){
        this.#couleur = couleur;
    }

    /**
     * @brief Getter de l'attribut disponible.
     */
    get disponible (){
        return this.#disponible;
    }

    /**
     * @brief Setter de l'attribut disponible.
     * 
     * @param {boolean} disponible
     */
    set disponible (disponible){
        this.#disponible = disponible;
    }

    /**
     * @brief Getter de l'attribut verso.
     * @returns[out] Retourne la valeur boolean si la carte 
     *               est retrounée sur la table.
     * 
     */
    get isVerso (){
        return this.#verso;
    }

    /**
     * @brief Setter de l'attribut verso.
     * 
     * @param {boolean} verso
     */
    set verso (verso){
        this.#verso = verso; 
    }
}

module.exports = {Carte}