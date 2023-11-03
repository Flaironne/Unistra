/**
 * @brief Classe spécialisée "Escroc" qui permet de définir le role 
 *        escroc pour le joueur qui en bénificie.
 */

// import BDD from '../bd/bdd_fonctions';

class Escroc{
    constructor (){

    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui permet de récupérer de récupérer la 
     *        moitié de sa mise cependant le joueur se couche automatiquement. 
     */
    recupererMoitierMise(joueur){
        // Fonction BDD qui permet d'attribuer les moitier 
        // de joueur.deposeJetons

        // BDD.update_user_jetons (joueur.idJoueur, joueur.deposeJetons/2);
        joueur.coucher = true;
        joueur.role.activationRole = true;
    }
}

module.exports =
{
    Escroc
} 