/**
 * @brief Classe spécialisée "Voyante" qui permet de définir le role Voyante
 *        pour le joueur qui en bénificie.
 */

class Indicateur{

    constructor (){

    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui permet de voir une des cartes aléatoirement
     *        d'un des joueurs choisi par la voyante.
     */
    voirCarteJoueur(joueur){
        joueur.role.activationRole = true;
    }
}

module.exports =
{
    Indicateur
} 