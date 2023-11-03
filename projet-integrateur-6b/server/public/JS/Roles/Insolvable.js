/**
 * @brief Classe specialisée "Insolvable" qui permet de définir le rôle
 *        insolvable pour le joueur qui en bénéficie.
 */

class Insolvable{

    constructor (){

    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui permet d'emprunter des jetons
     *        au dealer. Si à la fin du tour, il a la même 
     *        somme ou plus de jeton, il doit rendre au dealer.
     */
    emprunterArgentDealer(joueur){
        joueur.role.activationRole = true;
        
    }
}

module.exports =
{
    Insolvable
} 