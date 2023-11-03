/**
 * @brief Classe spécialisée "Policier" qui permet de définir le role policier 
 *        pour le joueur qui en bénéficie.
 */

class Policier{

    constructor (){

    }

   /**
    * @author Hayk ZARIKIAN
    * @brief Fonction qui permet de faire coucher un joueur.
    */ 
    mettreEnPrison(joueurs){
        // au hasard 
        let joueursValide = joueurs.filter((element) => element !== undefined && element !== joueur && element.coucher == false);
        let cible = Math.floor(Math.random () * joueursValide.length);
        joueursValide[cible].coucher = true;
        joueur.role.activationRole = true;
    }
}

module.exports =
{
    Policier
} 