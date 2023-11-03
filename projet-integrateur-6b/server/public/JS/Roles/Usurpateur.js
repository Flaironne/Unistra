/**
 * @brief Classe spécialisée "Usurpateur" qui permet de définir le role 
 *        usurpateur pour le joueur qui en bénéficie.
 */

class Usurpateur{

    constructor (){

    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction qui permet de copier le role 
     *        d'un des joueurs choisi aléatoirement.
     */
    copierRoleJoueur(joueur, joueurs){
        let joueursValide = joueurs.filter((element) => element !== undefined && element !== joueur && element.coucher == false);
        let cible = Math.floor(Math.random () * joueursValide.length);

        joueur.role = joueursValide[cible].role;
        joueur.role.activationRole = false;
    }
}

module.exports =
{
    Usurpateur
} 