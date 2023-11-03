/**
 * @brief Classe "Rang" qui permet de déterminer la valeur du 
 *        rang de la main du joueur. Pour ce faire, il cherche
 *        en commaçant par le rang le plus élevé au plus bas.
 */

const QUINTE_FLUSH_ROYALE = 10;
const QUINTE_FLUSH = 9;
const QUADS = 8;
const FULL = 7;
const COULEUR = 6;
const QUINTE = 5;
const BRELAN = 4;
const DEUX_PAIRES = 3;
const UNE_PAIRE = 2;
const HIGH_CARD = 1;


class Rang{
    #valeur;

    constructor (cartesMains, cartesTable){
        this.#valeur = this.chercheRang(cartesMains, cartesTable);
    }

    /**
     * @brief Getter de l'attribut valeur.
     * 
     * @returns[out] Retourne la valeur du rang.
     */
    get valeur (){
        return this.#valeur;
    }

    /**
     * @author Florian WU
     * @brief Fonction qui détermine si une quinte Flush Royale est présente
     *        selon les carte de la main du joueur donné et des cartes
     *        présentes sur la table.
     * 
     * @param {Carte[7]} cartesMainsTable
     * @returns[out]
     */
    quinteFlushRoyale (cartesMainsTable){
        // TODO : Florian
        if (this.couleur(cartesMainsTable) && this.quinteFlush(cartesMainsTable)  == true){
            for (let i = 0; i < cartesMainsTable.length; i++){
                if(cartesMainsTable[i].valeur == 14){
                    for (let i = 0; i < cartesMainsTable.length; i++){
                        if(cartesMainsTable[i].valeur == 13){ 
                            for (let i = 0; i < cartesMainsTable.length; i++){
                                if(cartesMainsTable[i].valeur == 12){ 
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
        return false;
        }
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui détermine si une quinte Flush est présente
     *        selon les carte de la main du joueur donné et des cartes
     *        présentes sur la table.
     * 
     * @param {Carte[7]} cartesMainsTable
     * @returns[out]
     */
    quinteFlush (cartesMainsTable){
        let cartesTriees = cartesMainsTable.slice().sort((a, b) => a.valeur - b.valeur);
        let nbCartesCouleur = 0;
        let maxCartesCouleur = 0;
        let cartesCouleur = [];

        for (let c = 0; c <= 3; c++) {
            nbCartesCouleur = 0;
            cartesCouleur = [];

            for (let i = 0; i < cartesTriees.length; i++) {
                if (cartesTriees[i].couleur === c) {
                  cartesCouleur.push(cartesTriees[i]);
                  nbCartesCouleur++;
                }
            }

            if (nbCartesCouleur >= 5) {
                maxCartesCouleur = nbCartesCouleur - 4;
                for (let i = 0; i < maxCartesCouleur; i++) {
                    if (cartesCouleur[i + 4].valeur - cartesCouleur[i].valeur === 4) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui détermine si une quads est présente
     *        selon les carte de la main du joueur donné et des cartes
     *        présentes sur la table.
     * 
     * @param {Carte[7]} cartesMainsTable
     * @returns[out]
     */
    quads (cartesMainsTable){
        let frequence = new Array(15).fill(0);

        for (let i = 0; i < 7; i++){
            frequence[cartesMainsTable[i].valeur]++;
        }

        for (let i = 2; i <= 14; i++){
            if (frequence[i] == 4)
            return true;
        }

        return false;
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui détermine si une full est présente
     *        selon les carte de la main du joueur donné et des cartes
     *        présentes sur la table.
     * 
     * @param {Carte[7]} cartesMainsTable
     * @returns[out]
     */
    full (cartesMainsTable){
        let avoirBrelan = false;
        let avoirPaire = false;
        let valeur;

        let result = this.brelan (cartesMainsTable);
        avoirBrelan = result.present;
        valeur = result.val;

        let carteSansBrelan = cartesMainsTable.filter(carte => carte.valeur !== valeur);

        avoirPaire = this.unePaire (carteSansBrelan);

        return (avoirBrelan && avoirPaire);
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui détermine si une couleur est présente
     *        selon les carte de la main du joueur donné et des cartes
     *        présentes sur la table.
     * 
     * @param {Carte[7]} cartesMainsTable
     * @returns[out]
     */
    couleur (cartesMainsTable){
        let nbCartesCouleur = [0, 0, 0, 0];

        for (let i = 0; i < cartesMainsTable.length; i++){
            let carte = cartesMainsTable[i];
            if (carte.couleur == 1){
                nbCartesCouleur[0]++;
            }
            else if (carte.couleur == 2){
                nbCartesCouleur[1]++;
            }
            else if (carte.couleur = 3){
                nbCartesCouleur[2]++;
            }
            else if (carte.couleur = 4){
                nbCartesCouleur[3]++;
            }
        }

        for (let i = 0; i < nbCartesCouleur.length; i++){
            if (nbCartesCouleur[i] >= 5){
                return true;
            }
        }

        return false;
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui détermine si une quinte est présente
     *        selon les carte de la main du joueur donné et des cartes
     *        présentes sur la table.
     * 
     * @param {Carte[7]} cartesMainsTable
     * @returns[out] Retourne vrai si une quinte est présente,
     *               faux dans le cas contraire.
     */
    quinte (cartesMainsTable){
        cartesMainsTable.sort((a, b) => a.valeur - b.valeur);
        let compteur = 1;

        for (let i = 0; i < cartesMainsTable.length - 1; i++){
            if (cartesMainsTable[i].valeur == (cartesMainsTable[i + 1].valeur) - 1){
                compteur++;
                if (compteur == 5)
                {
                    return true;
                }
            }
            else if (cartesMainsTable[i].valeur == cartesMainsTable[i + 1].valeur){
                continue;
            }
            else {
                compteur = 1;
            }
        }
        return false;
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui détermine si un brelan est présent
     *        selon les cartes de la main du joueur donné et des cartes
     *        présentes sur la table.
     * 
     * @param {Carte[7]} cartesMainsTable
     * @returns[out] Retourne vrai si un brelan est présent,
     *               faux dans le cas contraire. Il retourne 
     *               également la valeur du brelan.
     */
    brelan (cartesMainsTable){
        let valeurs = new Map ();
        for (let i = 0; i < cartesMainsTable.length; i++){
            if (!valeurs.has(cartesMainsTable[i].valeur)){
                valeurs.set(cartesMainsTable[i].valeur, 1);
            }
            else {
                valeurs.set(cartesMainsTable[i].valeur, valeurs.get(cartesMainsTable[i].valeur) + 1);
            }
        }

        for (let [valeur, count] of valeurs){
            if (count >= 3)
                return {present: true, val: valeur};
        }

        return false;
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui détermine si deux paires sont présente 
     *        selon les cartes de la main du joueur donné et des cartes
     *        présentes sur la table.
     * 
     * @param {Carte[7]} cartesMainsTable
     * @returns[out] Retourne vrai si deux paires sont présentes, 
     *          faux dans le cas contraire.
     */
    deuxPaires (cartesMainsTable){
        let valeurs = [];
        let paires = [];

        for (let i = 0; i < cartesMainsTable.length; i++){
            let carte = cartesMainsTable[i];
            valeurs[carte.valeur] = (valeurs[carte.valeur] || 0) + 1;
            if (valeurs[carte.valeur] == 2)
                paires.push (carte.valeur);
        }

        return (paires.length == 2);
    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui détermine si une paire est présente
     *        selon les cartes de la main du joueur donné et des cartes
     *        présentes sur la table.
     * 
     * @param {Carte[7]} cartesMainsTable
     * @returns[out] Retourne vrai si une paire est présente, 
     *               faux dans le cas contraire. 
     */
    unePaire (cartesMainsTable){
        let compteur = {};

        for (let i = 0; i < cartesMainsTable.length; i++){
            let carte = cartesMainsTable[i];
            if (compteur[carte.valeur]){
                compteur[carte.valeur]++;
            }
            else {
                compteur[carte.valeur] = 1;
            }
        }

        for (let valeur in compteur){
            if (compteur[valeur] === 2)
                return true;
        }
        return false;
    }

    /**
     * @brief Fonction qui permet de chercher le rang en fonction des cartes 
     *        dans la main d'un joueur et des cartes disponible sur la table.
     * 
     * @param {Carte[7]} cartesMainsTable
     * @returns[out] Retourne la valeur du rang.
     */
    chercheRang (cartesMains, cartesTable){
        let cartesMainsTable = cartesMains.concat(cartesTable);
        if (this.quinteFlushRoyale (cartesMainsTable))
            return QUINTE_FLUSH_ROYALE
        else if (this.quinteFlush (cartesMainsTable))
            return QUINTE_FLUSH;
        else if (this.quads (cartesMainsTable))
            return QUADS
        else if (this.full (cartesMainsTable))
            return FULL;
        else if (this.couleur (cartesMainsTable))
            return COULEUR;
        else if (this.quinte (cartesMainsTable))
            return QUINTE;
        else if (this.brelan (cartesMainsTable).present)
            return BRELAN
        else if (this.deuxPaires (cartesMainsTable))
            return DEUX_PAIRES;
        else if (this.unePaire (cartesMainsTable))
            return UNE_PAIRE;
        else
            return HIGH_CARD;
    }
}
module.exports={Rang}