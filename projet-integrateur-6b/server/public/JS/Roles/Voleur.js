/**
 * @brief Classe spécialisée "Voleur" qui permet d'initialiser le rôle joueur
 *        en voleur.
 */

class Voleur{

    constructor (){

    }

    /**
     * @author Hayk ZARIKIAN
     * @brief Fonction du pouvoir Voleur qui permet de voler aléatoirement la carte d'un
     *        des joueurs au hasard. Il est avantageux si nous voulons tenter ce risque car 
     *        l'adversaire obtient une des cartes dans la main du voleur. Cette fonction 
     *        permet finalement d'échanger la carte.
     * 
     * @param {Joueur} joueur 
     * @param {Array<Joueur[2..6]} joueurs 
     */
    volerCarte(joueur, joueurs){
        let joueursValide = joueurs.filter((element) => element !== undefined && element !== joueur && element.coucher == false);
        let cible = Math.floor(Math.random () * joueursValide.length);

        let cibleCarte = Math.floor(Math.random () * 2);
        let srcCarte = Math.floor(Math.random () * 2);

        joueur.mains.cartes[srcCarte] = joueursValide[cible].mains.cartes[cibleCarte];
        joueursValide[cible].mains.cartes[cibleCarte] = joueur.mains.cartes[srcCarte];
        joueur.role.activationRole = true;
    }
}

module.exports =
{
    Voleur
} 